// app/events/page.tsx
import { Suspense } from 'react';
import api from '@/lib/api';
import { Event } from '@/types';
import EventCard from '../../components/events/EventCard';
import EventFilters from '../../components/events/EventFilters';
import EventPagination from '../../components/events/EventPagination';
import EventsListSkeleton from '../../components/events/EventsListSkeleton';
import { filterEvents, sortEvents } from '@/lib/event-utils';
import { AppError } from '@/types/error';

interface EventsPageProps {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

// Composant de contenu - Server Component
async function EventsContent({ 
  category, 
  search, 
  page 
}: { 
  category?: string; 
  search?: string; 
  page?: string;
}) {
  let events: Event[] = [];

  try {
    const response = await api.get('/api/events');
    const data = response.data?.data ?? response.data ?? [];
    events = Array.isArray(data) ? data : [];
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error loading events:", err.message);
      throw new AppError("Unable to load events. Please check that the backend is running.");
    }
    throw new AppError("An unexpected error occurred");
  }

  // Appliquer les filtres côté serveur
  const filteredEvents = filterEvents(events, { category, search });
  const sortedEvents = sortEvents(filteredEvents, 'date');

  // Pagination
  const itemsPerPage = 9;
  const currentPage = Math.max(1, Number(page) || 1);
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mettre à jour le titre de la page en fonction des filtres
  const getPageTitle = () => {
    if (category) {
      const categoryMap: Record<string, string> = {
        'CONFERENCE': 'Conferences',
        'WORKSHOP': 'Workshops',
        'SEMINAR': 'Seminars',
        'MEETUP': 'Meetups',
        'WEBINAR': 'Webinars',
        'SOCIAL': 'Social Events',
        'FUNDRAISER': 'Fundraisers',
        'SPORTS': 'Sports Events',
        'ARTS': 'Arts & Culture',
        'TECHNOLOGY': 'Technology Events',
        'BUSINESS': 'Business Events',
        'EDUCATION': 'Education Events',
        'OTHER': 'Other Events'
      };
      return categoryMap[category] || 'Events';
    }
    return 'Our Events';
  };

  const getPageDescription = () => {
    if (search) {
      return `Showing results for "${search}"`;
    }
    if (category) {
      return `Discover all ${getPageTitle().toLowerCase()} on EventSync`;
    }
    return 'Discover all upcoming and ongoing events on EventSync';
  };

  if (sortedEvents.length === 0) {
    return (
      <>
        <div className="relative border-b border-coffee-200 dark:border-coffee-800/50 bg-white/70 dark:bg-coffee-950/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-audiowide bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent mb-4 tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-lg md:text-xl text-coffee-700 dark:text-coffee-300 max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
          <EventFilters initialSearch={search} initialCategory={category} />
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-coffee-400 font-medium">No events found</p>
            <p className="text-coffee-500 mt-3">Try adjusting your search or filters!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative border-b border-coffee-200 dark:border-coffee-800/50 bg-coffee-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-25 text-center">
          <h1 className="text-4xl md:text-5xl font-audiowide bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent mb-4 tracking-tight">
            {getPageTitle()}
          </h1>
          <p className="text-lg md:text-xl text-coffee-700 dark:text-coffee-300 max-w-2xl mx-auto">
            {getPageDescription()}
          </p>
          {search && (
            <div className="mt-4 text-sm text-coffee-500 dark:text-coffee-400">
              Found {sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <EventFilters initialSearch={search} initialCategory={category} />
        
        <div className="mb-4 text-sm text-coffee-600 dark:text-coffee-400">
          Showing {paginatedEvents.length} event{paginatedEvents.length !== 1 ? 's' : ''}
          {' '}on page {currentPage} of {totalPages}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination */}
        <EventPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedEvents.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
}

// Composant de chargement
function EventsLoading() {
  return (
    <>
      <div className="relative border-b border-coffee-200 dark:border-coffee-800/50 bg-white/70 dark:bg-coffee-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <div className="h-12 w-64 bg-coffee-200 dark:bg-coffee-800 rounded-lg animate-pulse mx-auto mb-4" />
          <div className="h-6 w-96 bg-coffee-200 dark:bg-coffee-800 rounded-lg animate-pulse mx-auto" />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="h-14 bg-coffee-200 dark:bg-coffee-800 rounded-full animate-pulse mb-8" />
        <EventsListSkeleton />
      </div>
    </>
  );
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  
  return (
    <div className="relative min-h-screen dark:from-coffee-950 dark:via-coffee-900/40 dark:to-coffee-800/30 pb-12 overflow-hidden">
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08] dark:opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGridCoffee" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1.2" fill="currentColor" className="text-coffee-500" />
              <circle cx="0" cy="0" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="30" cy="0" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="0" cy="30" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="30" cy="30" r="0.8" fill="currentColor" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGridCoffee)" />
        </svg>
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLinesCoffee" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" strokeWidth="0.8" className="text-coffee-500" />
              <line x1="20" y1="0" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-coffee-600" />
              <line x1="0" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalLinesCoffee)" />
        </svg>
      </div>

      {/* Contenu avec Suspense */}
      <Suspense fallback={<EventsLoading />}>
        <EventsContent 
          category={params?.category}
          search={params?.search}
          page={params?.page}
        />
      </Suspense>
    </div>
  );
}