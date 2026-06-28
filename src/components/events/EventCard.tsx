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
      <Link href={`/events/${event.id}`} className="group block h-full">
        <article className="relative flex flex-col h-full bg-bg-card p-1 rounded-[2rem] transition-all duration-700 hover:shadow-[0_20px_50px_-12px_rgba(41,18,10,0.3)]">
         
          <div className="flex flex-col flex-grow p-8 bg-bg-card rounded-[1.8rem] border border-coffee-800/30">
            
            <div className="flex justify-between items-start mb-8">
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${status.bg} ${status.text}`}>
                {status.label}
              </div>
              <span className="text-2xl opacity-40">{categoryInfo?.icon}</span>
            </div>
  
            <h3 className="text-3xl font-extrabold text-txt-title leading-[1.1] mb-6 tracking-tight group-hover:text-coffee-300 transition-colors">
              {event.title}
            </h3>
  
            <p className="text-txt-secondary text-base leading-relaxed mb-10 flex-grow">
              {event.description}
            </p>
  
            <div className="mt-auto pt-6 border-t border-coffee-800/30 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-coffee-600 tracking-widest">Date</span>
                <span className="text-sm font-semibold text-txt-body">{formatFullDate(event.startDate)}</span>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-coffee-800 flex items-center justify-center group-hover:bg-coffee-500 group-hover:border-coffee-500 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-txt-title group-hover:text-white" />
              </div>
            </div>
          </div>
  
          <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-t-full ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </article>
      </Link>
    );
  }