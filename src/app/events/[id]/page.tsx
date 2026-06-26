// app/events/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, Sparkles, Building2, Share2, CalendarDays, Clock as ClockIcon, Tag, Award, TrendingUp } from 'lucide-react';
import api from '@/lib/api';
import { formatFullDate, formatTime } from '@/lib/utils';
import { Event, Session } from '@/types';
import BackButton from '../../../components/events/BackButton';
import SessionCard from '../../../components/events/SessionCard';
import { AppError } from '@/types/error';
import { Suspense } from 'react';
import EventDetailSkeleton from '../../../components/events/EventDetailSkeleton';

async function EventContent({ id }: { id: string }) {
  let event: Event;

  try {
    const response = await api.get(`/api/events/${id}`);
    event = response.data?.data || response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes('404') || err.message.includes('Not Found')) {
        return notFound();
      }
      
      throw new AppError(
        err.message.includes('404') 
          ? "Event not found" 
          : "Failed to load event details"
      );
    }

    throw new AppError("An unexpected error occurred while loading the event");
  }

  if (!event || !event.id) {
    return notFound();
  }

  return (
    <>
      {/* Hero Section - With all info */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-coffee-50 dark:bg-coffee-950/40 p-8 md:p-12 border border-coffee-100/50 dark:border-coffee-800/30">
        {/* Modern background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-100/30 via-transparent to-coffee-200/20 dark:from-coffee-800/20 dark:to-coffee-700/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-coffee-200/20 dark:bg-coffee-700/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-coffee-300/10 dark:bg-coffee-600/10 rounded-full blur-3xl" />
        
        {/* Decorative circles */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-32 h-32 border-2 border-coffee-200/20 dark:border-coffee-700/20 rounded-full hidden lg:block" />
        <div className="absolute top-1/3 right-16 w-16 h-16 border-2 border-coffee-300/10 dark:border-coffee-600/10 rounded-full hidden lg:block" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-coffee-100 dark:bg-coffee-800/50 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400 uppercase tracking-wider">
                  Event
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-coffee-200/50 dark:bg-coffee-800/50 text-coffee-700 dark:text-coffee-300 rounded-full">
                    <ClockIcon className="w-3 h-3" />
                    {event.sessions?.length || 0} sessions
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-coffee-200/50 dark:bg-coffee-800/50 text-coffee-700 dark:text-coffee-300 rounded-full">
                    <Tag className="w-3 h-3" />
                    {event.category?.toLowerCase() || 'Event'}
                  </span>
                </div>
              </div>
            </div>
            
            <button className="p-2.5 rounded-xl bg-coffee-100/50 dark:bg-coffee-800/30 hover:bg-coffee-200/50 dark:hover:bg-coffee-700/30 transition-colors backdrop-blur-sm">
              <Share2 className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
            </button>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-txt-title tracking-tight mb-4 leading-tight">
            {event.title}
          </h1>
          
          <p className="text-lg md:text-xl text-txt-secondary max-w-3xl leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Info grid in hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-coffee-900/40 backdrop-blur-sm rounded-xl border border-coffee-100/50 dark:border-coffee-800/30">
              <div className="p-1.5 rounded-lg bg-coffee-100/50 dark:bg-coffee-800/30">
                <CalendarDays className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
              </div>
              <div>
                <p className="text-xs text-txt-disabled">Date</p>
                <p className="text-sm font-semibold text-txt-title">{formatFullDate(event.startDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-coffee-900/40 backdrop-blur-sm rounded-xl border border-coffee-100/50 dark:border-coffee-800/30">
              <div className="p-1.5 rounded-lg bg-coffee-100/50 dark:bg-coffee-800/30">
                <Clock className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
              </div>
              <div>
                <p className="text-xs text-txt-disabled">Time</p>
                <p className="text-sm font-semibold text-txt-title">{formatTime(event.startDate)} - {formatTime(event.endDate)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-coffee-900/40 backdrop-blur-sm rounded-xl border border-coffee-100/50 dark:border-coffee-800/30">
              <div className="p-1.5 rounded-lg bg-coffee-100/50 dark:bg-coffee-800/30">
                <MapPin className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
              </div>
              <div>
                <p className="text-xs text-txt-disabled">Location</p>
                <p className="text-sm font-semibold text-txt-title truncate">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-coffee-900/40 backdrop-blur-sm rounded-xl border border-coffee-100/50 dark:border-coffee-800/30">
              <div className="p-1.5 rounded-lg bg-coffee-100/50 dark:bg-coffee-800/30">
                <Users className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
              </div>
              <div>
                <p className="text-xs text-txt-disabled">Sessions</p>
                <p className="text-sm font-semibold text-txt-title">{event.sessions?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Statistics & additional info */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            {/* Stats Card */}
            <div className="bg-bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 rounded-lg bg-coffee-100 dark:bg-coffee-800/50">
                  <TrendingUp className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
                </div>
                <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider">
                  Statistics
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-subtle/50">
                  <span className="text-sm text-txt-secondary">Total Sessions</span>
                  <span className="text-lg font-bold text-coffee-600 dark:text-coffee-400">
                    {event.sessions?.length || 0}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-subtle/50">
                  <span className="text-sm text-txt-secondary">Total Capacity</span>
                  <span className="text-lg font-bold text-coffee-600 dark:text-coffee-400">
                    {event.sessions?.reduce((acc, s) => acc + (s.capacity || 0), 0) || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Card */}
            <div className="bg-bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-coffee-100 dark:bg-coffee-800/50">
                  <Tag className="w-4 h-4 text-coffee-600 dark:text-coffee-400" />
                </div>
                <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider">
                  Category
                </h3>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-coffee-50 dark:bg-coffee-900/30 border border-coffee-100/50 dark:border-coffee-800/30">
                <div className="p-2 rounded-lg bg-coffee-200/50 dark:bg-coffee-700/30">
                  <Award className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                </div>
                <div>
                  <p className="text-xs text-txt-disabled">Event Type</p>
                  <p className="text-sm font-semibold text-txt-title capitalize">
                    {event.category?.toLowerCase() || 'Uncategorized'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-txt-title flex items-center gap-3">
                Sessions
                <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400 bg-badge-bg text-badge-txt px-3 py-1 rounded-full">
                  {event.sessions?.length || 0}
                </span>
              </h2>
              <p className="text-sm text-txt-secondary mt-1">
                Discover all sessions for this event
              </p>
            </div>
          </div>

          {event.sessions && event.sessions.length > 0 ? (
            <div className="space-y-6">
              {event.sessions.map((session: Session, index: number) => (
                <div key={session.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <SessionCard session={session} eventId={event.id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-card rounded-2xl p-16 text-center border border-border shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-bg-subtle">
                  <Calendar className="w-8 h-8 text-txt-disabled" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-txt-title">
                    No sessions available
                  </p>
                  <p className="text-sm text-txt-secondary mt-1">
                    Sessions for this event will be added soon.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default async function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        <BackButton />
        
        <Suspense fallback={<EventDetailSkeleton />}>
          <EventContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}