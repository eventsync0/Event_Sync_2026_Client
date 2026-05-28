import { Suspense } from 'react';
import api from '@/lib/api';
import { Event } from '@/types';
import EventCard from './EventCard';
import EventsListSkeleton from './EventsListSkeleton';
import { AppError } from '@/types/error';

async function EventsContent() {
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

  if (events.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-coffee-400">No events available at the moment.</p>
        <p className="text-coffee-500 mt-3">Please check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  return (
    <div className="relative min-h-screen  dark:from-coffee-950 dark:via-coffee-900/40 dark:to-coffee-800/30 pb-12 overflow-hidden">
      
      {/* Éléments décoratifs (grille de points + lignes diagonales légères) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grille de points */}
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
        
        {/* Lignes diagonales très subtiles */}
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

      {/* En-tête (hero miniature) */}
      <div className="relative border-b border-coffee-200 dark:border-coffee-800/50 bg-white/70 dark:bg-coffee-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-audiowide bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Our Events
          </h1>
          <p className="text-lg md:text-xl text-coffee-700 dark:text-coffee-300 max-w-2xl mx-auto">
            Discover all upcoming and ongoing events on EventSync
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsContent />
        </Suspense>
      </div>
    </div>
  );
}