import Skeleton from '@/components/atoms/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Nav skeleton */}
      <div className="h-16 border-b border-white/[0.06] flex items-center px-6">
        <Skeleton variant="text" width="140px" height="32px" />
        <div className="flex-1" />
        <div className="flex gap-4">
          <Skeleton variant="text" width="60px" />
          <Skeleton variant="text" width="60px" />
          <Skeleton variant="text" width="60px" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full space-y-6">
          <Skeleton variant="text" width="200px" height="32px" />
          <Skeleton variant="text" width="100%" height="48px" />
          <Skeleton variant="text" width="80%" height="48px" />
          <Skeleton variant="text" lines={2} />
          <div className="flex gap-4 pt-4">
            <Skeleton variant="text" width="160px" height="48px" />
            <Skeleton variant="text" width="160px" height="48px" />
          </div>
        </div>
      </div>
    </div>
  );
}
