// components/events/EventPagination.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function EventPagination({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemsPerPage 
}: EventPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', page.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  // Calculer la plage de pages à afficher
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info */}
      <div className="text-sm text-coffee-500 dark:text-coffee-400">
        Showing <span className="font-medium text-coffee-700 dark:text-coffee-300">{startItem}</span> 
        {' '}to{' '} 
        <span className="font-medium text-coffee-700 dark:text-coffee-300">{endItem}</span>
        {' '}of{' '} 
        <span className="font-medium text-coffee-700 dark:text-coffee-300">{totalItems}</span> 
        events
      </div>

      {/* Pagination */}
      <nav className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? 'text-coffee-300 dark:text-coffee-600 cursor-not-allowed'
              : 'text-coffee-600 dark:text-coffee-400 hover:bg-coffee-100 dark:hover:bg-coffee-800 hover:text-coffee-800 dark:hover:text-coffee-200'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-2 text-coffee-400 dark:text-coffee-500"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => goToPage(page as number)}
                className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-md shadow-coffee-500/25 dark:shadow-coffee-700/50'
                    : 'text-coffee-600 dark:text-coffee-400 hover:bg-coffee-100 dark:hover:bg-coffee-800 hover:text-coffee-800 dark:hover:text-coffee-200'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? 'text-coffee-300 dark:text-coffee-600 cursor-not-allowed'
              : 'text-coffee-600 dark:text-coffee-400 hover:bg-coffee-100 dark:hover:bg-coffee-800 hover:text-coffee-800 dark:hover:text-coffee-200'
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}