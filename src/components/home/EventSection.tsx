import { Suspense } from 'react';
import api from '@/lib/api';
import { Event } from '@/types';
import EventCard from '../../app/events/EventCard';
import EventsListSkeleton from '../../app/events/EventsListSkeleton';
import { AppError } from '@/types/error';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar as CalendarIcon, Clock, TrendingUp, MapPin } from 'lucide-react';

// Composant pour les statistiques - Server Component
async function EventStats() {
  let events: Event[] = [];

  try {
    const response = await api.get('/api/events');
    const data = response.data?.data ?? response.data ?? [];
    events = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error loading events for stats:", err);
    return null;
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Calcul des statistiques réelles
  const totalEvents = events.length;
  
  // Événements du mois
  const eventsThisMonth = events.filter(event => {
    const date = new Date(event.startDate);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  // Événements actifs (en cours)
  const activeEvents = events.filter(event => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return start <= now && now <= end;
  });

  // Événements à venir
  const upcomingEvents = events.filter(event => {
    return new Date(event.startDate) > now;
  });

  // Lieux uniques
  const uniqueLocations = new Set(events.map(event => event.location)).size;

  // Événements en direct (live)
  const liveEvents = events.filter(event => {
    if (!event.sessions) return false;
    return event.sessions.some(session => {
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);
      return start <= now && now <= end;
    });
  });

  // Nombre de participants total (simulé ou à remplacer par une vraie donnée)
  const totalAttendees = events.reduce((acc, event) => acc + (event.attendees || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div className="bg-white/50 dark:bg-coffee-900/30 backdrop-blur-sm rounded-xl p-4 border border-coffee-100 dark:border-coffee-800 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-coffee-900 dark:text-white">{eventsThisMonth.length}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400">This month</p>
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-coffee-900/30 backdrop-blur-sm rounded-xl p-4 border border-coffee-100 dark:border-coffee-800 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-coffee-900 dark:text-white">{activeEvents.length}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400">Active events</p>
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-coffee-900/30 backdrop-blur-sm rounded-xl p-4 border border-coffee-100 dark:border-coffee-800 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-coffee-900 dark:text-white">{uniqueLocations}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400">Locations</p>
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-coffee-900/30 backdrop-blur-sm rounded-xl p-4 border border-coffee-100 dark:border-coffee-800 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{liveEvents.length}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400">Live now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="relative bg-gradient-to-br from-coffee-50/50 to-coffee-100/30 dark:from-coffee-900/30 dark:to-coffee-800/20 rounded-3xl p-12 text-center border border-coffee-200/50 dark:border-coffee-800/50 backdrop-blur-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coffee-100 dark:bg-coffee-800 mb-4">
          <CalendarIcon className="w-8 h-8 text-coffee-500 dark:text-coffee-400" />
        </div>
        <p className="text-xl text-coffee-600 dark:text-coffee-400 font-medium">No upcoming events at the moment</p>
        <p className="text-coffee-400 dark:text-coffee-500 mt-2">Check back soon for new opportunities!</p>
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
    <section className="relative py-16 sm:py-20 md:py-24 bg-background w-full overflow-hidden">
      {/* Fond avec pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header minimaliste */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-500 to-coffee-600 flex items-center justify-center shadow-lg shadow-coffee-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                Events
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-audiowide text-coffee-900 dark:text-white tracking-tight">
              What's <span className="bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-300 dark:to-coffee-200 bg-clip-text text-transparent">happening ?</span>
            </h2>
            <p className="text-coffee-500 dark:text-coffee-400 mt-2 text-lg">
              Find your next adventure
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-coffee-200 dark:border-coffee-700 hover:border-coffee-500 dark:hover:border-coffee-500 transition-all duration-200 text-coffee-700 dark:text-coffee-300 font-medium hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-coffee-900/30"
          >
            <span>Explore all</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Statistiques avec données réelles */}
        <Suspense fallback={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/50 dark:bg-coffee-900/30 rounded-xl p-4 border border-coffee-100 dark:border-coffee-800 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-coffee-200 dark:bg-coffee-700" />
                  <div>
                    <div className="h-7 w-12 bg-coffee-200 dark:bg-coffee-700 rounded" />
                    <div className="h-3 w-16 bg-coffee-200 dark:bg-coffee-700 rounded mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        }>
          <EventStats />
        </Suspense>

        {/* Grille des événements */}
        <Suspense fallback={<EventsListSkeleton />}>
          <EventsContent limit={limit} />
        </Suspense>

        {/* Footer avec gradient */}
        <div className="mt-14 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-500/5 to-coffee-600/5 dark:from-coffee-400/5 dark:to-coffee-500/5 rounded-3xl blur-2xl" />
          <div className="relative bg-white/60 dark:bg-coffee-900/40 backdrop-blur-sm rounded-3xl p-8 border border-coffee-200/50 dark:border-coffee-800/50 text-center">
            <p className="text-coffee-600 dark:text-coffee-400 text-lg font-medium">
              Ready to dive in?
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 mt-3 text-coffee-700 dark:text-coffee-300 hover:text-coffee-900 dark:hover:text-white font-semibold group transition-colors"
            >
              <span>View all upcoming events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}