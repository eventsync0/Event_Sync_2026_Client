export default function EventDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-coffee-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-coffee-950/30 p-8 md:p-12 border border-coffee-100/50 dark:border-coffee-800/30">
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-coffee-200 dark:bg-coffee-800/50"></div>
            <div className="h-5 w-24 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
          </div>
          
          <div className="h-12 w-3/4 bg-coffee-200 dark:bg-coffee-800/50 rounded-xl mb-4"></div>
          <div className="h-6 w-2/3 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            <div className="bg-bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-coffee-400 to-coffee-600 rounded-full"></div>
                <div className="h-5 w-28 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
              </div>
              
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-subtle"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-16 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                      <div className="h-4 w-32 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 mt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                      <div className="h-4 w-20 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                    </div>
                    <div className="h-6 w-10 bg-coffee-200 dark:bg-coffee-800/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Skeleton */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-32 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                <div className="h-6 w-12 bg-coffee-200 dark:bg-coffee-800/50 rounded-full"></div>
              </div>
              <div className="h-4 w-48 bg-coffee-200 dark:bg-coffee-800/50 rounded mt-1"></div>
            </div>
          </div>
          
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-bg-card rounded-2xl p-6 lg:p-8 border border-border">
                {/* Barre de statut */}
                <div className="h-1 w-full bg-gradient-to-r from-coffee-400 to-coffee-600 dark:from-coffee-500 dark:to-coffee-700 rounded-full mb-4"></div>
                
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Titre */}
                    <div className="space-y-3">
                      <div className="h-7 w-3/4 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                      <div className="h-4 w-full bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                      <div className="h-4 w-2/3 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                    </div>

                    {/* Grille d'informations */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-2.5 bg-bg-subtle px-3 py-2 rounded-lg">
                          <div className="w-4 h-4 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                          <div className="h-4 w-16 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* Intervenants */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                        <div className="h-3 w-20 bg-coffee-200 dark:bg-coffee-800/50 rounded"></div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2].map((k) => (
                          <div key={k} className="h-6 w-20 bg-bg-subtle rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bouton Skeleton */}
                  <div className="flex items-center lg:items-start lg:pt-1">
                    <div className="h-11 w-28 bg-gradient-to-r from-coffee-400 to-coffee-500 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}