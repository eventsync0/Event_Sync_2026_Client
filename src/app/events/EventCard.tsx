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
      <div className="bg-card dark:bg-coffee-950 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-coffee-100 dark:border-coffee-800 h-full flex flex-col">

        {/* Status Badge */}
        <div className="h-2">
          {hasLiveSession ? (
            <div className="bg-coffee-600 text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE NOW
            </div>
          ) : isEventStarted ? (
            <div className="bg-amber-500 text-white text-xs font-bold px-6 py-2.5 flex items-center gap-2">
              EVENT STARTED
            </div>
          ) : (
            <div className="bg-coffee-400 text-white text-xs font-bold px-6 py-2.5">
              UPCOMING
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex-1">
          <h3 className="text-xl md:text-2xl font-audiowide text-foreground mb-4 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors line-clamp-2 min-h-[2.8em]">
            {event.title}
          </h3>

          <p className="text-txt-secondary mb-6 line-clamp-3 text-[15px] leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-coffee-600 dark:text-coffee-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-foreground">Date</p>
                <p className="text-txt-secondary">{formatFullDate(event.startDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-coffee-600 dark:text-coffee-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-foreground">Time</p>
                <p className="text-txt-secondary">
                  {formatTime(event.startDate)} — {formatTime(event.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-coffee-600 dark:text-coffee-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-foreground">Location</p>
                <p className="text-txt-secondary line-clamp-2">{event.location}</p>
              </div>
            </div>

            {sessionCount > 0 && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-coffee-600 dark:text-coffee-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Sessions</p>
                  <p className="text-txt-secondary">
                    {sessionCount} session{sessionCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-coffee-100 dark:border-coffee-800 px-6 py-5 bg-coffee-50/50 dark:bg-coffee-900/30 mt-auto">
          <div className="text-coffee-600 dark:text-coffee-400 font-semibold flex items-center justify-between text-sm group-hover:text-coffee-700 dark:group-hover:text-coffee-300 transition-colors">
            View Event Details
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}