import Link from "next/link";
import { Event } from "@/types";
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from "lucide-react";
import { formatFullDate, formatTime } from "@/lib/utils";
import { EVENT_CATEGORIES } from "@/lib/constants";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const sessionCount = event.sessions?.length || 0;
  const categoryInfo = EVENT_CATEGORIES.find((c) => c.value === event.category);

  const now = new Date();
  const hasLiveSession = event.sessions?.some((session) => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    return start <= now && now <= end;
  });

  const getStatus = () => {
    if (hasLiveSession) {
      return {
        label: "Live",
        bg: "bg-green-500/20",
        text: "text-green-400",
        dot: "bg-green-400",
        pulse: true,
      };
    }
    if (new Date(event.startDate) <= now) {
      return {
        label: "In Progress",
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        dot: "bg-yellow-400",
        pulse: false,
      };
    }
    return {
      label: "Upcoming",
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      dot: "bg-blue-400",
      pulse: false,
    };
  };

  const status = getStatus();

  const metaItems = [
    { icon: Calendar, text: formatFullDate(event.startDate) },
    {
      icon: Clock,
      text: `${formatTime(event.startDate)} — ${formatTime(event.endDate)}`,
    },
    { icon: MapPin, text: event.location },
    ...(sessionCount > 0
      ? [
          {
            icon: Users,
            text: `${sessionCount} session${sessionCount > 1 ? "s" : ""}`,
          },
        ]
      : []),
  ];

  return (
    <Link href={`/events/${event.id}`} className="block group h-full">
      <article
        className={`
          relative h-full 
          bg-bg-card/80 backdrop-blur-xl
          border border-coffee-800/30 dark:border-coffee-700/30
          rounded-3xl overflow-hidden 
          shadow-xl hover:shadow-2xl
          transition-all duration-500 
          hover:-translate-y-2 
          hover:border-coffee-600/50 dark:hover:border-coffee-500/50
        `}
        aria-label={`Event: ${event.title}`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-coffee-500/10 via-transparent to-coffee-700/10 dark:from-coffee-400/5 dark:via-transparent dark:to-coffee-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        <div
          className="h-1 w-full bg-gradient-to-r from-coffee-500/80 via-coffee-400/60 to-coffee-600/80"
          aria-hidden="true"
        />

        <div className="relative p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4 gap-2">
            <span
              className={`
                flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full 
                ${status.bg} ${status.text} 
                backdrop-blur-sm
              `}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${status.dot} ${status.pulse ? "animate-pulse" : ""}`}
              />
              {status.label}
            </span>

            {categoryInfo && (
              <span
                className={`
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium 
                bg-bg-card/50 dark:bg-coffee-900/50 backdrop-blur-sm 
                border border-coffee-800/30 dark:border-coffee-700/30
                flex-shrink-0
              `}
              >
                <span className="text-base" aria-hidden="true">
                  {categoryInfo.icon}
                </span>
                <span className="text-txt-title dark:text-txt-title">
                  {categoryInfo.label}
                </span>
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-txt-title dark:text-txt-title mb-2 group-hover:text-coffee-600 dark:group-hover:text-coffee-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="text-txt-secondary dark:text-txt-secondary text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
            {event.description || "No description available."}
          </p>

          <div className="space-y-2.5 text-sm mb-4">
            {metaItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-bg-subtle/50 dark:bg-coffee-800/50 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-coffee-800/20 dark:border-coffee-700/20">
                  <item.icon className="w-4 h-4 text-coffee-500 dark:text-coffee-400" />
                </div>
                <span className="truncate">{item.text}</span>
              </div>
            ))}
          </div>

          <div
            className={`
            relative pt-4 mt-auto 
            border-t border-coffee-800/30 dark:border-coffee-700/30
            bg-bg-subtle/30 dark:bg-coffee-900/20 backdrop-blur-sm 
            group-hover:bg-bg-subtle/50 dark:group-hover:bg-coffee-900/40 
            transition-colors 
            -mx-6 px-6 pb-4
          `}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-txt-secondary dark:text-txt-secondary group-hover:text-txt-body dark:group-hover:text-txt-body transition-colors">
                View Details
              </span>
              <ArrowUpRight
                className="w-4 h-4 text-coffee-400 dark:text-coffee-500 group-hover:text-coffee-600 dark:group-hover:text-coffee-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-3xl border border-coffee-600/20 dark:border-coffee-500/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "inset 0 0 30px rgba(205, 91, 50, 0.05)",
          }}
          aria-hidden="true"
        />
      </article>
    </Link>
  );
}
