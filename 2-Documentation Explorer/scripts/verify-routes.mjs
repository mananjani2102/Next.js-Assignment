/**
 * Route Verification Script for Orbit Docs
 * Validates routes, sitemap, HTML semantics, internal links, 404 handling, redirects and icons.
 */

const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

let failed = false;
let checkCount = 0;
let passCount = 0;
let failCount = 0;

function report(name, passed, details = '') {
  checkCount++;
  if (passed) {
    passCount++;
    console.log(`[PASS] ${name}${details ? ` (${details})` : ''}`);
  } else {
    failCount++;
    failed = true;
    console.error(`[FAIL] ${name}${details ? ` (${details})` : ''}`);
  }
}

async function fetchText(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  return { res, text };
}

function extractHrefs(html) {
  const hrefs = [];
  const regex = /<a\b[^>]*?\bhref=(["'])(.*?)\1/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    hrefs.push(match[2]);
  }
  return hrefs;
}

function isStaticAsset(path) {
  const assetExtensions = [
    '.ico',
    '.png',
    '.jpg',
    '.jpeg',
    '.svg',
    '.webp',
    '.css',
    '.js',
    '.json',
    '.map',
    '.txt',
    '.xml',
    '.woff',
    '.woff2',
    '.ttf',
  ];
  const clean = path.split('?')[0].split('#')[0].toLowerCase();
  return assetExtensions.some((ext) => clean.endsWith(ext));
}

async function runVerification() {
  console.log(`Starting Orbit Docs route verification against BASE_URL: ${BASE_URL}`);

  const crawledHtmlPages = new Map(); // path -> html
  const linkSources = new Map(); // targetPath -> Set of sourcePaths

  // -------------------------------------------------------------
  // CHECK 1: Sitemap and HTML page semantics
  // -------------------------------------------------------------
  console.log('\n--- CHECK 1: Sitemap and Page Quality ---');
  let locPaths = [];
  try {
    const { res: sitemapRes, text: sitemapXml } = await fetchText(`${BASE_URL}/sitemap.xml`);
    if (sitemapRes.status === 200) {
      report('Sitemap /sitemap.xml returns HTTP 200', true);
      const locRegex = /<loc>(.*?)<\/loc>/g;
      let locMatch;
      while ((locMatch = locRegex.exec(sitemapXml)) !== null) {
        const fullUrl = locMatch[1].trim();
        try {
          const parsed = new URL(fullUrl);
          locPaths.push(parsed.pathname);
        } catch {
          locPaths.push(fullUrl.replace(/^https?:\/\/[^/]+/, ''));
        }
      }
      report(
        'Extract sitemap <loc> URLs',
        locPaths.length > 0,
        `${locPaths.length} paths extracted`
      );
    } else {
      report('Sitemap /sitemap.xml returns HTTP 200', false, `Status: ${sitemapRes.status}`);
    }
  } catch (err) {
    report('Fetch /sitemap.xml', false, err.message);
  }

  for (const docPath of locPaths) {
    try {
      const { res, text: html } = await fetchText(`${BASE_URL}${docPath}`);
      const is200 = res.status === 200;
      report(`Sitemap path ${docPath} status 200`, is200, `Status: ${res.status}`);

      const contentType = res.headers.get('content-type') || '';
      const isHtml = contentType.includes('text/html') || (!docPath.endsWith('.xml') && !docPath.endsWith('.txt'));

      if (isHtml) {
        crawledHtmlPages.set(docPath, html);

        // Record outgoing links
        const hrefs = extractHrefs(html);
        for (const href of hrefs) {
          if (href.startsWith('/') && !href.startsWith('/_next') && !isStaticAsset(href)) {
            const cleanHref = href.split('#')[0].split('?')[0] || '/';
            if (!linkSources.has(cleanHref)) {
              linkSources.set(cleanHref, new Set());
            }
            linkSources.get(cleanHref).add(docPath);
          }
        }

        // 1. Exactly one <h1
        const h1Matches = html.match(/<h1[\s>]/gi) || [];
        report(
          `Page ${docPath} exactly one <h1> tag`,
          h1Matches.length === 1,
          `Found ${h1Matches.length}`
        );

        // 2. Non-empty <title>
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const titleText = titleMatch ? titleMatch[1].trim() : '';
        report(
          `Page ${docPath} non-empty <title>`,
          Boolean(titleText.length > 0),
          titleText ? `Title: "${titleText}"` : 'Missing title'
        );

        // 3. Meta description
        const metaDescMatch = html.match(
          /<meta[^>]+(?:name=["']description["'][^>]+content=["']([^"']*)["']|content=["']([^"']*)["'][^>]+name=["']description["'])/i
        );
        const metaDesc = metaDescMatch
          ? (metaDescMatch[1] || metaDescMatch[2] || '').trim()
          : '';
        report(
          `Page ${docPath} valid meta description`,
          Boolean(metaDesc.length > 0),
          metaDesc ? `Length: ${metaDesc.length}` : 'Missing description'
        );

        // 4. No occurrences of "undefined", "[object Object]" or "NaN" in body text
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : html;
        // Strip scripts and styles to isolate visible rendered body text
        const bodyText = bodyContent
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

        const hasUndefined = bodyText.includes('undefined');
        const hasObjectObject = bodyText.includes('[object Object]');
        const hasNaN = bodyText.includes('NaN');

        const leaks = [];
        if (hasUndefined) leaks.push('undefined');
        if (hasObjectObject) leaks.push('[object Object]');
        if (hasNaN) leaks.push('NaN');

        report(
          `Page ${docPath} no undefined / [object Object] / NaN leaks in body text`,
          leaks.length === 0,
          leaks.length === 0 ? 'Clean' : `Leaks detected: ${leaks.join(', ')}`
        );
      }
    } catch (err) {
      report(`Validate sitemap path ${docPath}`, false, err.message);
    }
  }

  // -------------------------------------------------------------
  // CHECK 2: Internal link crawler
  // -------------------------------------------------------------
  console.log('\n--- CHECK 2: Internal Link Crawler ---');
  const distinctLinks = Array.from(linkSources.keys());
  console.log(`Discovered ${distinctLinks.length} distinct internal links from crawled pages.`);

  for (const link of distinctLinks) {
    try {
      const res = await fetch(`${BASE_URL}${link}`, { redirect: 'follow' });
      const sources = Array.from(linkSources.get(link) || []);
      const sourcesPreview = sources.slice(0, 3).join(', ') + (sources.length > 3 ? '...' : '');

      report(
        `Internal link ${link} returns 200`,
        res.status === 200,
        `Status: ${res.status}, from: [${sourcesPreview}]`
      );
    } catch (err) {
      const sources = Array.from(linkSources.get(link) || []);
      report(
        `Internal link ${link} reachable`,
        false,
        `Error: ${err.message}, from: [${sources.join(', ')}]`
      );
    }
  }

  // -------------------------------------------------------------
  // CHECK 3: Expected 404 error pages
  // -------------------------------------------------------------
  console.log('\n--- CHECK 3: Expected 404 Status and Diagnostic Shells ---');
  const expectedDocs404s = [
    '/docs/routing/catch-all-param',
    '/docs/core-concepts/routing/extra',
    '/docs/Core-Concepts/Routing',
    '/docs/guides/nextjs/app-router/nope',
  ];

  for (const missingPath of expectedDocs404s) {
    try {
      const { res, text: html } = await fetchText(`${BASE_URL}${missingPath}`, {
        redirect: 'manual',
      });
      const is404 = res.status === 404;
      const hasPageNotFound = html.includes('Page not found');
      const hasPath = html.includes(missingPath);
      const hasSidebar = html.includes('aria-label="Documentation sidebar"');

      const passed = is404 && hasPageNotFound && hasPath && hasSidebar;
      const issues = [];
      if (!is404) issues.push(`Status ${res.status} !== 404`);
      if (!hasPageNotFound) issues.push('Missing "Page not found"');
      if (!hasPath) issues.push(`Missing path text "${missingPath}"`);
      if (!hasSidebar) issues.push('Missing sidebar landmark aria-label');

      report(
        `Expected 404 for docs route ${missingPath}`,
        passed,
        passed ? '404 status, sidebar present, path matched' : issues.join('; ')
      );
    } catch (err) {
      report(`Expected 404 for docs route ${missingPath}`, false, err.message);
    }
  }

  // Definitely missing route outside docs
  try {
    const { res, text: html } = await fetchText(`${BASE_URL}/definitely-missing`, {
      redirect: 'manual',
    });
    const is404 = res.status === 404;
    const hasPageNotFound = html.includes('Page not found');
    const passed = is404 && hasPageNotFound;

    const issues = [];
    if (!is404) issues.push(`Status ${res.status} !== 404`);
    if (!hasPageNotFound) issues.push('Missing "Page not found"');

    report(
      'Expected 404 for root route /definitely-missing',
      passed,
      passed ? '404 status, "Page not found" in body' : issues.join('; ')
    );
  } catch (err) {
    report('Expected 404 for root route /definitely-missing', false, err.message);
  }

  // -------------------------------------------------------------
  // CHECK 4: Root redirect and top-level pages
  // -------------------------------------------------------------
  console.log('\n--- CHECK 4: Root Redirect and Core Endpoints ---');
  try {
    const rootRes = await fetch(`${BASE_URL}/`, { redirect: 'manual' });
    const isRedirect =
      rootRes.status === 307 ||
      rootRes.status === 308 ||
      rootRes.status === 302 ||
      rootRes.status === 301;
    const location = rootRes.headers.get('location') || '';
    const redirectsToDocs = location === '/docs' || location === `${BASE_URL}/docs`;

    report(
      'Root / redirects to /docs',
      isRedirect && redirectsToDocs,
      `Status: ${rootRes.status}, Location: ${location}`
    );
  } catch (err) {
    report('Root / redirects to /docs', false, err.message);
  }

  const coreRoutes = [
    '/docs',
    '/about',
    '/privacy-policy',
    '/terms-and-conditions',
    '/robots.txt',
    '/sitemap.xml',
  ];

  for (const route of coreRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      report(
        `Core route ${route} returns 200`,
        res.status === 200,
        `Status: ${res.status}`
      );
    } catch (err) {
      report(`Core route ${route} returns 200`, false, err.message);
    }
  }

  // -------------------------------------------------------------
  // CHECK 5: Favicon and touch icon verification
  // -------------------------------------------------------------
  console.log('\n--- CHECK 5: Favicon and Touch Icon Assets ---');
  try {
    const { text: homeHtml } = await fetchText(`${BASE_URL}/docs`);
    const headMatch = homeHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const headContent = headMatch ? headMatch[1] : homeHtml;

    const iconRegex = /<link\b[^>]*?\b(?:rel=["'](?:shortcut )?icon["']|rel=["']apple-touch-icon["'])[^>]*?>/gi;
    const iconTags = headContent.match(iconRegex) || [];

    const iconHrefs = [];
    for (const tag of iconTags) {
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (hrefMatch && hrefMatch[1]) {
        iconHrefs.push(hrefMatch[1]);
      }
    }

    report(
      'Extract icon links from /docs head',
      iconHrefs.length > 0,
      `Found ${iconHrefs.length} icon link tag(s)`
    );

    for (const iconHref of iconHrefs) {
      const fullIconUrl = new URL(iconHref, BASE_URL).href;
      try {
        const iconRes = await fetch(fullIconUrl);
        report(
          `Icon asset ${iconHref} returns 200`,
          iconRes.status === 200,
          `Status: ${iconRes.status}`
        );
      } catch (err) {
        report(`Icon asset ${iconHref} returns 200`, false, err.message);
      }
    }
  } catch (err) {
    report('Extract and verify icon assets from /docs', false, err.message);
  }

  // -------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------
  console.log('\n=============================================');
  console.log('ROUTE VERIFICATION SUMMARY');
  console.log('=============================================');
  console.log(`Total Checks Executed : ${checkCount}`);
  console.log(`Checks Passed         : ${passCount}`);
  console.log(`Checks Failed         : ${failCount}`);
  console.log('=============================================');

  if (failed) {
    console.error('RESULT: Route verification FAILED with errors.');
    process.exit(1);
  } else {
    console.log('RESULT: All route verification checks PASSED successfully.');
    process.exit(0);
  }
}

runVerification().catch((err) => {
  console.error('Unhandled fatal error in verification script:', err);
  process.exit(1);
});
