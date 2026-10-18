import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";

export default function StudentProfileLoading() {
  return (
    <div role="status">
      <span className="sr-only">Loading student profile...</span>
      <ProfileSkeleton />
    </div>
  );
}
