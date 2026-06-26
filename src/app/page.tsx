import AboutSection from '@/components/home/AboutSection';
import EventSection from '@/components/home/EventSection';
import HeroSection from '@/components/home/HeroSection';
import SpeakerSection from '@/components/home/SpeakerSection';
import { Home, Calendar, Users, Info, Sparkles } from 'lucide-react';

export default function HomePage() {
  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'speakers', label: 'Speakers', icon: Users },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="relative">
      {/* Vertical navigation on the right - 4 icons */}
      <nav className="fixed top-1/2 -translate-y-1/2 right-6 z-50 flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative p-3 rounded-xl transition-all duration-300 bg-bg-card/80 backdrop-blur-sm text-txt-secondary border border-border hover:bg-coffee-600 hover:text-white hover:border-coffee-600 hover:scale-110 hover:shadow-lg hover:shadow-coffee-600/30"
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              
              {/* Glow effect on hover */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-coffee-600/0 via-coffee-600/10 to-coffee-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Modern tooltip */}
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-coffee-800/90 backdrop-blur-sm text-white text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg border border-white/10 translate-x-2 group-hover:translate-x-0">
                {item.label}
                <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-coffee-800/90 rotate-45 border-r border-t border-white/10" />
              </span>
              
              {/* Active glow dot */}
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-coffee-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:h-10" />
            </a>
          );
        })}
      </nav>

      {/* Main content - sections with id */}
      <section id="hero">
        <HeroSection />
      </section>
      <section id="events">
        <EventSection limit={3} />
      </section>
      <section id="speakers">
        <SpeakerSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>

    </div>
  );
}