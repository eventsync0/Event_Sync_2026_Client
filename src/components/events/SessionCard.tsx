import { Clock, Users, ChevronRight, MapPin, Calendar, User, Mic } from 'lucide-react';
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
    <div className="group relative bg-bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border transition-all duration-300 hover:-translate-y-1">
      {/* Barre de statut en haut */}
      <div className="h-1 w-full bg-gradient-to-r from-coffee-400 to-coffee-600 dark:from-coffee-500 dark:to-coffee-700" />
      
      {/* Badge LIVE flottant */}
      {isSessionLive && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
            Live
          </span>
        </div>
      )}

      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Contenu principal */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* En-tête avec titre et métadonnées */}
            <div className="space-y-3">
              <h3 className="text-xl lg:text-2xl font-bold text-txt-title leading-tight group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors">
                {session.title}
              </h3>
              
              <p className="text-txt-secondary text-sm lg:text-base leading-relaxed line-clamp-2">
                {session.description}
              </p>
            </div>

            {/* Grille d'informations */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-txt-secondary bg-bg-subtle px-3 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-coffee-500 dark:text-coffee-400 flex-shrink-0" />
                <span className="font-medium text-txt-title">
                  {formatTime(session.startTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 text-sm text-txt-secondary bg-bg-subtle px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-coffee-500 dark:text-coffee-400 flex-shrink-0" />
                <span className="font-medium text-txt-title">
                  {formatTime(session.startTime)} - {formatTime(session.endTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 text-sm text-txt-secondary bg-bg-subtle px-3 py-2 rounded-lg">
                <Users className="w-4 h-4 text-coffee-500 dark:text-coffee-400 flex-shrink-0" />
                <span className="font-medium text-txt-title">
                  {session.capacity} places
                </span>
              </div>
              
              {session.room && (
                <div className="flex items-center gap-2.5 text-sm text-txt-secondary bg-bg-subtle px-3 py-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-coffee-500 dark:text-coffee-400 flex-shrink-0" />
                  <span className="font-medium text-txt-title truncate">
                    {session.room.name}
                  </span>
                </div>
              )}
            </div>

            {/* Intervenants */}
            {session.speakers && session.speakers.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                  <span className="text-xs font-medium text-txt-secondary uppercase tracking-wider">
                    Intervenants
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {session.speakers.map((speaker, index) => (
                    <span 
                      key={speaker.id || index} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-txt-title bg-bg-subtle rounded-full hover:bg-coffee-100 dark:hover:bg-coffee-900/30 transition-colors"
                    >
                      <User className="w-3 h-3" />
                      {speaker.fullName || speaker.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lien Live */}
            {isSessionLive && (
              <div className="pt-2">
                <LiveSessionLink sessionId={session.id} />
              </div>
            )}
          </div>

          {/* Bouton Voir les détails */}
          <div className="flex items-center lg:items-start lg:pt-1">
            <Link
              href={`/sessions/${session.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-btn-primary-txt bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap group/btn"
            >
              <span>Détails</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}