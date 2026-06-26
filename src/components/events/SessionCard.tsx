import { Clock, Users, ChevronRight, MapPin, Calendar, User, Mic, Sparkles } from 'lucide-react';
import { formatTime, isLive } from '@/lib/utils';
import { Session } from '@/types';
import LiveSessionLink from './LiveSessionLink';
import Link from 'next/link';
import Image from 'next/image';

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
                  {session.capacity} seats
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

            {/* Intervenants - Version moderne avec avatars */}
            {session.speakers && session.speakers.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                  <span className="text-xs font-semibold text-txt-secondary uppercase tracking-wider">
                    Speakers
                  </span>
                  <span className="text-[10px] font-bold text-coffee-600 dark:text-coffee-400 bg-coffee-100 dark:bg-coffee-800/50 px-2 py-0.5 rounded-full">
                    {session.speakers.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {session.speakers.map((speaker, index) => (
                    <div 
                      key={speaker.id || index} 
                      className="group/speaker flex items-center gap-3 px-3 py-2 bg-bg-subtle rounded-xl border border-border/50 hover:border-coffee-300 dark:hover:border-coffee-700 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      {/* Avatar avec image ou initiale */}
                      {speaker.photoUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-coffee-200 dark:ring-coffee-700 flex-shrink-0">
                          <Image 
                            src={speaker.photoUrl} 
                            alt={speaker.fullName || speaker.name || 'Speaker'}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coffee-400 to-coffee-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(speaker.fullName || speaker.name || 'S').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-txt-title truncate">
                          {speaker.fullName || speaker.name}
                        </p>
                        {speaker.bio && (
                          <p className="text-xs text-txt-secondary truncate max-w-[120px]">
                            {speaker.bio}
                          </p>
                        )}
                      </div>
                      {/* Petit badge de statut (optionnel) */}
                      {index === 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-coffee-100 dark:bg-coffee-800/50 text-coffee-600 dark:text-coffee-400 text-[10px] font-bold rounded-full">
                          <Sparkles className="w-2.5 h-2.5" />
                          Lead
                        </span>
                      )}
                    </div>
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
              className="inline-flex items-center gap-2 px-6 py-3 text-sm text-amber-50 font-medium  bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap group/btn"
            >
              <span>more</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}