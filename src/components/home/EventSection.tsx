import { Suspense } from 'react';
import api from '@/lib/api';
import { Event } from '@/types';
import EventCard from '../../app/events/EventCard';
import EventsListSkeleton from '../../app/events/EventsListSkeleton';
import { AppError } from '@/types/error';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function EventsContent({ limit = 3 }: { limit?: number }) {
  let events: Event[] = [];

  try {
    const response = await api.get('/api/events');
    const data = response.data?.data ?? response.data ?? [];
    events = Array.isArray(data) ? data : [];
    events = events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    if (limit && events.length > limit) {
      events = events.slice(0, limit);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error loading events for home section:", err.message);
      throw new AppError("Unable to load events.");
    }
    throw new AppError("An unexpected error occurred");
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-coffee-500 dark:text-coffee-400">No upcoming events at the moment.</p>
        <p className="text-sm text-coffee-400 mt-2">Check back soon!</p>
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

export default function EventSection({ limit = 3 }: { limit?: number }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background w-full border-t border-coffee-200 dark:border-coffee-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-audiowide bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-txt-secondary mt-2 text-sm sm:text-base">
              Don't miss these exciting opportunities
            </p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-coffee-600 dark:text-coffee-400 hover:text-coffee-700 dark:hover:text-coffee-300 font-medium transition-colors text-sm sm:text-base"
          >
            View all events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Suspense fallback={<EventsListSkeleton />}>
          <EventsContent limit={limit} />
        </Suspense>
      </div>
    </section>
  );
}