import { notFound } from 'next/navigation';
import { Calendar, Clock, MapPin } from 'lucide-react';
import api from '@/lib/api';
import { formatFullDate, formatTime } from '@/lib/utils';
import { Event, Session } from '@/types';
import BackButton from './BackButton';
import SessionCard from './SessionCard';
import { AppError } from '@/types/error';
import { Suspense } from 'react';
import EventDetailSkeleton from './EventDetailSkeleton';

async function EventContent({ id }: { id: string }) {
  let event: Event | null = null;

  try {
    const response = await api.get(`/api/events/${id}`);
    event = response.data?.data || response.data;
  } catch (err: unknown) {
    console.error("Error loading event:", err);

    if (err instanceof Error) {
      throw new AppError(
        err.message.includes('404') 
          ? "Event not found" 
          : "Failed to load event details"
      );
    }

    throw new AppError("An unexpected error occurred while loading the event");
  }

  if (!event) {
    notFound();
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
          {event.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          {event.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-8">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Event Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatFullDate(event.startDate)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">
                    {formatTime(event.startDate)} — {formatTime(event.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sessions</h2>

          {event.sessions && event.sessions.length > 0 ? (
            <div className="space-y-6">
              {event.sessions.map((session: Session) => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  eventId={event.id} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800">
              <p className="text-gray-500">No sessions available for this event.</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        <BackButton />

        <Suspense fallback={<EventDetailSkeleton />}>
          <EventContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}