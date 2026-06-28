// components/events/EventCard.tsx
import Link from 'next/link';
import { Event, EventCategory } from '@/types';
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { formatFullDate, formatTime } from '@/lib/utils';
import { EVENT_CATEGORIES } from '@/lib/constants';

interface EventCardProps {
  event: Event;
}

// Palette de couleurs moderne avec dégradés - utilisant les couleurs coffee
function getCategoryGradient(category: EventCategory) {
  const gradients: Record<EventCategory, string> = {
    CONFERENCE: 'from-coffee-500/20 to-coffee-700/20 dark:from-coffee-400/10 dark:to-coffee-600/10',
    WORKSHOP: 'from-coffee-400/20 to-coffee-600/20 dark:from-coffee-300/10 dark:to-coffee-500/10',
    SEMINAR: 'from-coffee-500/20 to-coffee-600/20 dark:from-coffee-400/10 dark:to-coffee-500/10',
    MEETUP: 'from-coffee-400/20 to-coffee-500/20 dark:from-coffee-300/10 dark:to-coffee-400/10',
    WEBINAR: 'from-coffee-500/20 to-coffee-700/20 dark:from-coffee-400/10 dark:to-coffee-600/10',
    SOCIAL: 'from-coffee-300/20 to-coffee-500/20 dark:from-coffee-200/10 dark:to-coffee-400/10',
    FUNDRAISER: 'from-coffee-600/20 to-coffee-800/20 dark:from-coffee-500/10 dark:to-coffee-700/10',
    SPORTS: 'from-coffee-400/20 to-coffee-600/20 dark:from-coffee-300/10 dark:to-coffee-500/10',
    ARTS: 'from-coffee-300/20 to-coffee-500/20 dark:from-coffee-200/10 dark:to-coffee-400/10',
    TECHNOLOGY: 'from-coffee-500/20 to-coffee-700/20 dark:from-coffee-400/10 dark:to-coffee-600/10',
    BUSINESS: 'from-coffee-600/20 to-coffee-800/20 dark:from-coffee-500/10 dark:to-coffee-700/10',
    EDUCATION: 'from-coffee-400/20 to-coffee-600/20 dark:from-coffee-300/10 dark:to-coffee-500/10',
    OTHER: 'from-coffee-300/20 to-coffee-400/20 dark:from-coffee-200/10 dark:to-coffee-300/10'
  };
  return gradients[category] || gradients.OTHER;
}

function getCategoryColor(category: EventCategory) {
  const colors: Record<EventCategory, string> = {
    CONFERENCE: 'bg-coffee-600',
    WORKSHOP: 'bg-coffee-500',
    SEMINAR: 'bg-coffee-600',
    MEETUP: 'bg-coffee-400',
    WEBINAR: 'bg-coffee-600',
    SOCIAL: 'bg-coffee-300',
    FUNDRAISER: 'bg-coffee-700',
    SPORTS: 'bg-coffee-500',
    ARTS: 'bg-coffee-400',
    TECHNOLOGY: 'bg-coffee-600',
    BUSINESS: 'bg-coffee-700',
    EDUCATION: 'bg-coffee-500',
    OTHER: 'bg-coffee-400'
  };
  return colors[category] || colors.OTHER;
}

function getCategoryStatusColor(category: EventCategory) {
  const colors: Record<EventCategory, string> = {
    CONFERENCE: 'border-coffee-600/20 dark:border-coffee-400/20',
    WORKSHOP: 'border-coffee-500/20 dark:border-coffee-300/20',
    SEMINAR: 'border-coffee-600/20 dark:border-coffee-400/20',
    MEETUP: 'border-coffee-400/20 dark:border-coffee-300/20',
    WEBINAR: 'border-coffee-600/20 dark:border-coffee-400/20',
    SOCIAL: 'border-coffee-300/20 dark:border-coffee-200/20',
    FUNDRAISER: 'border-coffee-700/20 dark:border-coffee-500/20',
    SPORTS: 'border-coffee-500/20 dark:border-coffee-300/20',
    ARTS: 'border-coffee-400/20 dark:border-coffee-300/20',
    TECHNOLOGY: 'border-coffee-600/20 dark:border-coffee-400/20',
    BUSINESS: 'border-coffee-700/20 dark:border-coffee-500/20',
    EDUCATION: 'border-coffee-500/20 dark:border-coffee-300/20',
    OTHER: 'border-coffee-400/20 dark:border-coffee-300/20'
  };
  return colors[category] || colors.OTHER;
}

export default function EventCard({ event }: EventCardProps) {
  const sessionCount = event.sessions?.length || 0;
  const categoryInfo = EVENT_CATEGORIES.find(c => c.value === event.category);
  const gradient = getCategoryGradient(event.category);
  const colorClass = getCategoryColor(event.category);
  const borderClass = getCategoryStatusColor(event.category);

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
        bg: 'bg-success/10 dark:bg-success/20', 
        text: 'text-success dark:text-success',
        dot: 'bg-success'
      };
    }
    if (isEventStarted) {
      return { 
        label: 'In Progress', 
        bg: 'bg-warning/10 dark:bg-warning/20', 
        text: 'text-warning dark:text-warning',
        dot: 'bg-warning'
      };
    }
    return { 
      label: 'Upcoming', 
      bg: 'bg-info/10 dark:bg-info/20', 
      text: 'text-info dark:text-info',
      dot: 'bg-info'
    };
  };

  const status = getStatus();

  return (
    <Link href={`/events/${event.id}`} className="block group h-full">
      <div className={`relative h-full bg-bg-card/80  backdrop-blur-xl rounded-3xl overflow-hidden border ${borderClass} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
        
      
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
            
            {/* Category Badge */}
            {categoryInfo && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-bg-card/50 dark:bg-coffee-900/50 backdrop-blur-sm border ${borderClass}`}>
                <span className="text-base">{categoryInfo.icon}</span>
                <span className="text-txt-title dark:text-txt-title">{categoryInfo.label}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-txt-title dark:text-txt-title mb-2 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-txt-secondary dark:text-txt-secondary text-sm leading-relaxed line-clamp-2 mb-6">
            {event.description}
          </p>

          {/* Meta info avec icônes modernes */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
              <div className="w-8 h-8 rounded-full bg-bg-subtle dark:bg-coffee-800 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
              </div>
              <span>{formatFullDate(event.startDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
              <div className="w-8 h-8 rounded-full bg-bg-subtle dark:bg-coffee-800 flex items-center justify-center">
                <Clock className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
              </div>
              <span>{formatTime(event.startDate)} — {formatTime(event.endDate)}</span>
            </div>

            <div className="flex items-center gap-3 text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
              <div className="w-8 h-8 rounded-full bg-bg-subtle dark:bg-coffee-800 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
              </div>
              <span className="truncate">{event.location}</span>
            </div>

            {sessionCount > 0 && (
              <div className="flex items-center gap-3 text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
                <div className="w-8 h-8 rounded-full bg-bg-subtle dark:bg-coffee-800 flex items-center justify-center">
                  <Users className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                </div>
                <span>{sessionCount} session{sessionCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-border/50 dark:border-coffee-800/50 px-6 py-4 bg-bg-subtle/30 dark:bg-coffee-900/20 backdrop-blur-sm group-hover:bg-bg-subtle/50 dark:group-hover:bg-coffee-900/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
              View Details
            </span>
            <ArrowUpRight className="w-4 h-4 text-coffee-400 dark:text-coffee-500 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}