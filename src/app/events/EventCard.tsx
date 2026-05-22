// src/components/event/EventCard.tsx
import Link from 'next/link';
import { Event } from '@/types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatFullDate, formatTime } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const sessionCount = event.sessions?.length || 0;

  const hasLiveSession = event.sessions?.some((session) => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    const now = new Date();
    return start <= now && now <= end;
  });

  const isEventStarted = new Date(event.startDate) <= new Date();

  return (
    <Link href={`/events/${event.id}`} className="block group">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 h-full flex flex-col">

        {/* Status Badge */}
        <div className="h-2">
          {hasLiveSession ? (
            <div className="bg-success text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE NOW
            </div>
          ) : isEventStarted ? (
            <div className="bg-yellow-500 text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2">
              EVENT STARTED
            </div>
          ) : (
            <div className="bg-gray-500 text-white text-xs font-bold px-6 py-2.5">
              UPCOMING
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.8em]">
            {event.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-[15px] leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Date</p>
                <p className="text-gray-600 dark:text-gray-400">{formatFullDate(event.startDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Time</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatTime(event.startDate)} — {formatTime(event.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Location</p>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{event.location}</p>
              </div>
            </div>

            {sessionCount > 0 && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Sessions</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {sessionCount} session{sessionCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-5 bg-gray-50 dark:bg-gray-950 mt-auto">
          <div className="text-primary font-semibold flex items-center justify-between text-sm group-hover:text-primary-600 transition-colors">
            View Event Details
            <span className="text-lg group-hover:translate-x-1 transition">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}