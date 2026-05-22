// src/app/events/EventsListSkeleton.tsx
export default function EventsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden animate-pulse"
        >
          {/* Status Badge Skeleton */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 w-full"></div>

          <div className="p-6 md:p-8">
            {/* Title */}
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-xl w-4/5 mb-4"></div>
            
            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>

            {/* Info Lines */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-5 bg-gray-50 dark:bg-gray-950">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );
}