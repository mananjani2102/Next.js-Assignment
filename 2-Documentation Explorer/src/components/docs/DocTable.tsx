import type { TableColumnStyle } from '@/types';
import { InlineText } from './InlineText';

interface DocTableProps {
  headers: string[];
  columnStyles: TableColumnStyle[];
  rows: string[][];
}

export function DocTable({ headers, columnStyles, rows }: DocTableProps) {
  const tableLabel = headers[0] ? `${headers[0]} table` : 'Data table';

  function getColumnClass(style: TableColumnStyle): string {
    switch (style) {
      case 'text':
        return 'text-[15px] text-body';
      case 'mono':
        return 'font-mono text-[13px] text-ink';
      case 'mono-muted':
        return 'font-mono text-[13px] text-muted';
      case 'mono-accent':
        return 'font-mono text-[13px] text-primary font-medium';
      case 'mono-chip':
        return '';
      default:
        return 'text-[15px] text-body';
    }
  }

  function renderCellContent(cellText: string, style: TableColumnStyle) {
    if (style === 'mono-chip') {
      return (
        <span className="bg-inline-code border border-line rounded-xs font-mono text-[13px] text-ink px-2 py-0.5 inline-block">
          <InlineText text={cellText} />
        </span>
      );
    }
    return <InlineText text={cellText} />;
  }

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={tableLabel}
      className="overflow-x-auto border border-line-strong rounded-xs my-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
    >
      <table className="w-full border-collapse text-left">
        <thead className="bg-surface border-b border-line-strong font-mono text-[12px] uppercase tracking-wider text-muted font-semibold">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3">
                <InlineText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-line hover:bg-surface/50 transition-colors"
            >
              {row.map((cell, colIndex) => {
                const style = columnStyles[colIndex] ?? 'text';
                return (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 align-top ${getColumnClass(style)}`}
                  >
                    {renderCellContent(cell, style)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
