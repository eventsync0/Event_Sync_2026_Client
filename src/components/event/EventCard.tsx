// src/components/event/EventCard.tsx
import Link from 'next/link';
import { Event } from '@/types';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { formatFullDate, formatTime } from '@/lib/utils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const hasLiveSession = event.sessions?.some(session => 
    new Date(session.startTime) <= new Date() && 
    new Date(session.endTime) >= new Date()
  );

  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        <div className="p-6 flex-1">
          {hasLiveSession && (
            <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              LIVE EN CE MOMENT
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-gray-600 line-clamp-3 mb-6">
            {event.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{formatFullDate(event.startDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>
                {formatTime(event.startDate)} — {formatTime(event.endDate)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 mt-auto">
          <div className="text-blue-600 font-medium text-sm flex items-center justify-between">
            Voir le programme complet
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}