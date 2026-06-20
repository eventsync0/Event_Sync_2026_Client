// components/events/EventCard.tsx
import Link from 'next/link';
import { Event, EventCategory } from '@/types';
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { formatFullDate, formatTime } from '@/lib/utils';
import { EVENT_CATEGORIES } from '@/lib/constants';

interface EventCardProps {
  event: Event;
}

// Palette de couleurs moderne avec dégradés
function getCategoryGradient(category: EventCategory) {
  const gradients: Record<EventCategory, string> = {
    CONFERENCE: 'from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10',
    WORKSHOP: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10',
    SEMINAR: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10',
    MEETUP: 'from-pink-500/20 to-rose-500/20 dark:from-pink-500/10 dark:to-rose-500/10',
    WEBINAR: 'from-indigo-500/20 to-blue-500/20 dark:from-indigo-500/10 dark:to-blue-500/10',
    SOCIAL: 'from-yellow-500/20 to-amber-500/20 dark:from-yellow-500/10 dark:to-amber-500/10',
    FUNDRAISER: 'from-red-500/20 to-rose-500/20 dark:from-red-500/10 dark:to-rose-500/10',
    SPORTS: 'from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10',
    ARTS: 'from-rose-500/20 to-pink-500/20 dark:from-rose-500/10 dark:to-pink-500/10',
    TECHNOLOGY: 'from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10',
    BUSINESS: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
    EDUCATION: 'from-teal-500/20 to-cyan-500/20 dark:from-teal-500/10 dark:to-cyan-500/10',
    OTHER: 'from-gray-500/20 to-gray-600/20 dark:from-gray-500/10 dark:to-gray-600/10'
  };
  return gradients[category] || gradients.OTHER;
}

function getCategoryColor(category: EventCategory) {
  const colors: Record<EventCategory, string> = {
    CONFERENCE: 'bg-blue-500',
    WORKSHOP: 'bg-green-500',
    SEMINAR: 'bg-purple-500',
    MEETUP: 'bg-pink-500',
    WEBINAR: 'bg-indigo-500',
    SOCIAL: 'bg-yellow-500',
    FUNDRAISER: 'bg-red-500',
    SPORTS: 'bg-orange-500',
    ARTS: 'bg-rose-500',
    TECHNOLOGY: 'bg-cyan-500',
    BUSINESS: 'bg-emerald-500',
    EDUCATION: 'bg-teal-500',
    OTHER: 'bg-gray-500'
  };
  return colors[category] || colors.OTHER;
}

export default function EventCard({ event }: EventCardProps) {
  const sessionCount = event.sessions?.length || 0;
  const categoryInfo = EVENT_CATEGORIES.find(c => c.value === event.category);
  const gradient = getCategoryGradient(event.category);
  const colorClass = getCategoryColor(event.category);

  const hasLiveSession = event.sessions?.some((session) => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    const now = new Date();
    return start <= now && now <= end;
  });

  const isEventStarted = new Date(event.startDate) <= new Date();

  const getStatus = () => {
    if (hasLiveSession) {
      return { 
        label: 'Live Now', 
        bg: 'bg-green-500/10 dark:bg-green-500/20', 
        text: 'text-green-600 dark:text-green-400',
        dot: 'bg-green-500'
      };
    }
    if (isEventStarted) {
      return { 
        label: 'In Progress', 
        bg: 'bg-amber-500/10 dark:bg-amber-500/20', 
        text: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500'
      };
    }
    return { 
      label: 'Upcoming', 
      bg: 'bg-blue-500/10 dark:bg-blue-500/20', 
      text: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500'
    };
  };

  const status = getStatus();

  return (
    <Link href={`/events/${event.id}`} className="block group h-full">
      <div className="relative h-full bg-white/80 dark:bg-coffee-950/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 dark:border-coffee-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        
        {/* Glassmorphism overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Glow effect */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${colorClass} rounded-full opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-700 group-hover:scale-150`} />

        {/* Category color bar */}
        <div className={`h-1 w-full ${colorClass}`} />

        <div className="relative p-6 flex-1">
          {/* Header avec status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${hasLiveSession ? 'animate-pulse' : ''}`} />
                {status.label}
              </span>
            </div>
            
            {/* Category Badge à la place du coeur et partage */}
            {categoryInfo && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/50 dark:bg-coffee-900/50 backdrop-blur-sm border border-white/20 dark:border-coffee-700/50`}>
                <span className="text-base">{categoryInfo.icon}</span>
                <span className="text-coffee-700 dark:text-coffee-300">{categoryInfo.label}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-coffee-900 dark:text-white mb-2 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-coffee-500 dark:text-coffee-400 text-sm leading-relaxed line-clamp-2 mb-6">
            {event.description}
          </p>

          {/* Meta info avec icônes modernes */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-coffee-500 dark:text-coffee-400 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <span>{formatFullDate(event.startDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-coffee-500 dark:text-coffee-400 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span>{formatTime(event.startDate)} — {formatTime(event.endDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-coffee-500 dark:text-coffee-400 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="truncate">{event.location}</span>
            </div>

            {sessionCount > 0 && (
              <div className="flex items-center gap-3 text-coffee-500 dark:text-coffee-400 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 transition-colors">
                <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span>{sessionCount} session{sessionCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-white/20 dark:border-coffee-800/50 px-6 py-4 bg-white/30 dark:bg-coffee-900/20 backdrop-blur-sm group-hover:bg-white/50 dark:group-hover:bg-coffee-900/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400 group-hover:text-coffee-800 dark:group-hover:text-coffee-200 transition-colors">
              View Details
            </span>
            <ArrowUpRight className="w-4 h-4 text-coffee-400 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}