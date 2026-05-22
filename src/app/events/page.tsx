// src/app/events/page.tsx
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
        <p className="text-2xl text-gray-400">No events available at the moment.</p>
        <p className="text-gray-500 mt-3">Please check back soon!</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Our Events
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover all upcoming and ongoing events on EventSync
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsContent />
        </Suspense>
      </div>
    </div>
  );
}