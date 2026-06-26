// app/events/[id]/page.tsx
import notFound from './notfound';
import { Calendar, Clock, MapPin, Users, Sparkles, Building2 } from 'lucide-react';
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
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-coffee-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-900 dark:to-coffee-950/30 p-8 md:p-12 border border-coffee-100/50 dark:border-coffee-800/30">
        {/* Décoration de fond */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-200/20 dark:bg-coffee-700/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 dark:bg-amber-700/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-xl bg-coffee-100 dark:bg-coffee-800/50">
              <Sparkles className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
            </div>
            <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400 uppercase tracking-wider">
              Événement
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-txt-title tracking-tight mb-4 leading-tight">
            {event.title}
          </h1>
          
          <p className="text-lg md:text-xl text-txt-secondary max-w-3xl leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Informations */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            <div className="bg-bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <h3 className="text-sm font-semibold text-txt-secondary uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-coffee-400 to-coffee-600 rounded-full" />
                Informations
              </h3>
              
              <div className="space-y-5">
                {/* Date */}
                <div className="flex items-start gap-4 group">
                  <div className="p-2.5 rounded-xl bg-bg-subtle group-hover:bg-coffee-100 dark:group-hover:bg-coffee-800/50 transition-colors">
                    <Calendar className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-txt-disabled uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold text-txt-title mt-0.5">
                      {formatFullDate(event.startDate)}
                    </p>
                  </div>
                </div>

                {/* Heure */}
                <div className="flex items-start gap-4 group">
                  <div className="p-2.5 rounded-xl bg-bg-subtle group-hover:bg-coffee-100 dark:group-hover:bg-coffee-800/50 transition-colors">
                    <Clock className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-txt-disabled uppercase tracking-wider">Horaire</p>
                    <p className="text-sm font-semibold text-txt-title mt-0.5">
                      {formatTime(event.startDate)} — {formatTime(event.endDate)}
                    </p>
                  </div>
                </div>

                {/* Lieu */}
                <div className="flex items-start gap-4 group">
                  <div className="p-2.5 rounded-xl bg-bg-subtle group-hover:bg-coffee-100 dark:group-hover:bg-coffee-800/50 transition-colors">
                    <MapPin className="w-5 h-5 text-coffee-600 dark:text-coffee-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-txt-disabled uppercase tracking-wider">Lieu</p>
                    <p className="text-sm font-semibold text-txt-title mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-coffee-500" />
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Sessions count */}
                <div className="pt-4 mt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                      <span className="text-sm text-txt-secondary">Sessions</span>
                    </div>
                    <span className="text-sm font-bold text-coffee-600 dark:text-coffee-400 bg-badge-bg text-badge-txt px-3 py-1 rounded-full">
                      {event.sessions?.length || 0}
                    </span>
                  </div>
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
                Découvrez toutes les sessions de cet événement
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
                    Aucune session disponible
                  </p>
                  <p className="text-sm text-txt-secondary mt-1">
                    Les sessions pour cet événement seront bientôt ajoutées.
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