export function BannerSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-16 h-16 bg-gray-300 rounded"></div>
    </div>
  );
}

export function SponsorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
    </div>
  );
}

export function EventSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
    </div>
  );
}

