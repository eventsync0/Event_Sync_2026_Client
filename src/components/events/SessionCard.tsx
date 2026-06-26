import { Clock, Users, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { formatTime, isLive } from '@/lib/utils';
import { Session } from '@/types';
import LiveSessionLink from './LiveSessionLink';
import Link from 'next/link';

interface SessionCardProps {
  session: Session;
  eventId: string;
}

export default function SessionCard({ session, eventId }: SessionCardProps) {
  const isSessionLive = isLive(session.startTime, session.endTime);

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-coffee-200 dark:hover:border-coffee-700 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors">
                {session.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                {session.description}
              </p>
            </div>

            {isSessionLive && (
              <span className="bg-coffee-600 text-white px-5 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 whitespace-nowrap self-start animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                LIVE
              </span>
            )}
          </div>

          {/* Informations */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-coffee-500 dark:text-coffee-400" />
              {formatTime(session.startTime)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-coffee-500 dark:text-coffee-400" />
              {formatTime(session.startTime)} — {formatTime(session.endTime)}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-coffee-500 dark:text-coffee-400" />
              {session.capacity} places
            </div>
            {session.room && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-coffee-500 dark:text-coffee-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{session.room.name}</span>
              </div>
            )}
          </div>

          {/* Intervenants si présents */}
          {session.speakers && session.speakers.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Intervenants:</span>
              {session.speakers.map((speaker, index) => (
                <span key={speaker.id || index} className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {speaker.fullName || speaker.name}
                </span>
              ))}
            </div>
          )}

          {/* Lien Live si disponible */}
          {isSessionLive && (
            <div className="mt-4">
              <LiveSessionLink sessionId={session.id} />
            </div>
          )}
        </div>

        {/* Bouton Voir les détails */}
        <div className="flex items-center lg:items-start lg:pt-1">
          <Link
            href={`/sessions/${session.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap group/btn"
          >
            <span>Voir les détails</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}