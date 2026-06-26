export default function EventDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title Skeleton */}
      <div className="mb-10">
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
        <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sessions Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="flex gap-6">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}