// app/components/sections/HeroSection.tsx (version optimisée)
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  CalendarDays, 
  Users, 
  MapPin, 
  ThumbsUp 
} from 'lucide-react';

// Import dynamique de Framer Motion pour réduire le bundle initial
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function HeroSection() {
  const stats = [
    { value: '500+', label: 'Événements', icon: CalendarDays },
    { value: '50k+', label: 'Participants', icon: Users },
    { value: '120+', label: 'Villes', icon: MapPin },
    { value: '98%', label: 'Satisfaction', icon: ThumbsUp },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-coffee-100/80 dark:bg-coffee-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-coffee-200 dark:border-coffee-700">
            
            <span className="text-sm font-medium text-coffee-700 dark:text-coffee-300">
              Plateforme événementielle nouvelle génération
            </span>
          </div>

          {/* Titre */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-audiowide mb-6 tracking-tight">
            <span className="text-txt-title">Bienvenue sur</span>
            <br />
            <span className="bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-600 bg-clip-text text-transparent">
              EventSync
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-txt-secondary max-w-3xl mx-auto mb-12 font-light">
            Découvrez, créez et participez aux événements qui façonnent votre communauté.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 bg-coffee-600 hover:bg-coffee-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <CalendarDays className="w-5 h-5" />
              <span>Explorer les événements</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-coffee-300 dark:border-coffee-700 text-txt-body hover:bg-coffee-100 dark:hover:bg-coffee-800/50 transition-all duration-300"
            >
              En savoir plus
            </Link>
          </div>

          {/* Statistiques avec vraies icônes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-coffee-100 dark:bg-coffee-800 group-hover:bg-coffee-200 dark:group-hover:bg-coffee-700 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-coffee-600 dark:text-coffee-400" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-audiowide text-coffee-600 dark:text-coffee-400">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-txt-secondary mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}