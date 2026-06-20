// app/events/components/EventsListSkeleton.tsx
export default function EventsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-coffee-950 rounded-xl shadow-sm border border-coffee-100 dark:border-coffee-800 overflow-hidden animate-pulse"
        >
          {/* Status Badge Skeleton */}
          <div className="h-12 bg-coffee-200 dark:bg-coffee-800 w-full"></div>

          <div className="p-6 md:p-8">
            {/* Title */}
            <div className="h-7 bg-coffee-200 dark:bg-coffee-800 rounded-xl w-4/5 mb-4"></div>
            
            {/* Description */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-coffee-200 dark:bg-coffee-800 rounded w-full"></div>
              <div className="h-4 bg-coffee-200 dark:bg-coffee-800 rounded w-5/6"></div>
              <div className="h-4 bg-coffee-200 dark:bg-coffee-800 rounded w-4/5"></div>
            </div>

            {/* Info Lines */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-coffee-200 dark:bg-coffee-800 rounded"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-coffee-200 dark:bg-coffee-800 rounded w-16"></div>
                    <div className="h-4 bg-coffee-200 dark:bg-coffee-800 rounded w-40"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="border-t border-coffee-100 dark:border-coffee-800 px-6 py-5 bg-coffee-50/50 dark:bg-coffee-900/30">
            <div className="h-5 bg-coffee-200 dark:bg-coffee-800 rounded w-32"></div>
          </div>
        </div>
      ))}
    </div>
  );
}