// src/app/events/[id]/SessionCard.tsx
import { Clock, Users } from 'lucide-react';
import { formatTime, isLive } from '@/lib/utils';
import { Session } from '@/types';
import LiveSessionLink from './LiveSessionLink';

interface SessionCardProps {
  session: Session;
  eventId: string;
}

export default function SessionCard({ session, eventId }: SessionCardProps) {
  const isSessionLive = isLive(session.startTime, session.endTime);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {session.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{session.description}</p>
        </div>

        {isSessionLive && (
          <span className="bg-success text-white px-5 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 whitespace-nowrap self-start">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          {formatTime(session.startTime)} — {formatTime(session.endTime)}
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {session.capacity} seats
        </div>
      </div>

      {session.room && (
        <p className="text-sm text-gray-500 mb-6">
          Room: <span className="font-medium text-gray-700 dark:text-gray-300">{session.room.name}</span>
        </p>
      )}

      {isSessionLive && (
        <LiveSessionLink eventId={eventId} sessionId={session.id} />
      )}
    </div>
  );
}