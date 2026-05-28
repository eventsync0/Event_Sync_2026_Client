// app/components/sections/HeroSection.tsx (version responsivité optimisée)
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  CalendarDays, 
  Users, 
  MapPin, 
  ThumbsUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

export default function HeroSection() {
  const stats = [
    { value: '500+', label: 'Events', icon: CalendarDays, color: 'from-coffee-500 to-coffee-600' },
    { value: '50k+', label: 'Participants', icon: Users, color: 'from-coffee-400 to-coffee-500' },
    { value: '120+', label: 'Cities', icon: MapPin, color: 'from-coffee-500 to-coffee-700' },
    { value: '98%', label: 'Satisfaction', icon: ThumbsUp, color: 'from-coffee-400 to-coffee-600' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* ========== FOND PRINCIPAL ========== */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-50 via-coffee-100/60 to-coffee-200/40 dark:from-coffee-950 dark:via-coffee-900/80 dark:to-coffee-800/60" />
      
      {/* ========== CERCLES COLORÉS RESPONSIVE ========== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercles grands écrans */}
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full border-4 border-coffee-400/30 dark:border-coffee-500/20 animate-spin-slow hidden lg:block" />
        <div className="absolute -top-1/3 -right-1/3 w-[600px] h-[600px] rounded-full border-4 border-coffee-500/25 dark:border-coffee-400/30 animate-spin-slower hidden md:block" />
        <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full border-4 border-coffee-600/20 dark:border-coffee-300/40 animate-spin-slowest hidden sm:block" />
        
        {/* Cercles version mobile (plus petits) */}
        <div className="absolute -top-1/4 -right-1/4 w-[300px] h-[300px] rounded-full border-2 border-coffee-400/20 dark:border-coffee-500/15 block lg:hidden" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[250px] h-[250px] rounded-full border-2 border-coffee-500/15 dark:border-coffee-400/20 block md:hidden" />
        
        {/* Cercles à gauche - version responsive */}
        <div className="absolute -bottom-1/2 -left-1/2 w-[700px] h-[700px] rounded-full border-4 border-coffee-400/20 dark:border-coffee-500/15 hidden xl:block" />
        <div className="absolute -bottom-1/3 -left-1/3 w-[500px] h-[500px] rounded-full border-4 border-coffee-500/15 dark:border-coffee-400/25 hidden lg:block" />
        
        {/* Cercle central adapté */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-radial from-coffee-400/10 via-coffee-500/5 to-transparent" />
      </div>

      {/* ========== LIGNES DIAGONALES - Responsive ========== */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.06] md:opacity-[0.08] dark:opacity-[0.08] dark:md:opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="30" y2="30" stroke="currentColor" strokeWidth="1" className="text-coffee-500" />
              <line x1="15" y1="0" x2="30" y2="15" stroke="currentColor" strokeWidth="0.5" className="text-coffee-600" />
              <line x1="0" y1="15" x2="15" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      {/* ========== TRIANGLES - Responsive ========== */}
      <div className="absolute inset-0">
        {/* Triangle bas gauche - caché sur mobile */}
        <svg className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 opacity-[0.08] dark:opacity-[0.12] hidden sm:block" viewBox="0 0 200 200">
          <polygon points="0,200 200,200 100,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-500" />
          <polygon points="0,140 140,140 70,70" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-600" />
          <polygon points="0,80 80,80 40,40" fill="none" stroke="currentColor" strokeWidth="1" className="text-coffee-700" />
        </svg>
        
        {/* Triangle haut droit - caché sur mobile */}
        <svg className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 opacity-[0.08] dark:opacity-[0.12] hidden sm:block" viewBox="0 0 200 200">
          <polygon points="200,0 0,0 100,100" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-500" />
          <polygon points="200,60 60,60 130,130" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-600" />
          <polygon points="200,120 120,120 160,160" fill="none" stroke="currentColor" strokeWidth="1" className="text-coffee-700" />
        </svg>
      </div>

      {/* ========== HEXAGONES - Responsive ========== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 opacity-[0.08] dark:opacity-[0.12] hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-600" />
          </svg>
        </div>
        
        <div className="absolute bottom-[20%] right-[10%] w-28 h-28 md:w-40 md:h-40 lg:w-56 lg:h-56 opacity-[0.08] dark:opacity-[0.12] hidden md:block">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-600" />
          </svg>
        </div>
      </div>

      {/* ========== GRILLE DE POINTS - Responsive ========== */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.06] md:opacity-[0.08] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="1.5" fill="currentColor" className="text-coffee-500" />
              <circle cx="0" cy="0" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="25" cy="0" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="0" cy="25" r="0.8" fill="currentColor" className="text-coffee-600" />
              <circle cx="25" cy="25" r="0.8" fill="currentColor" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* ========== RAYONS LUMINEUX - Responsive ========== */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[15%] w-40 h-40 md:w-64 md:h-64 bg-gradient-radial from-coffee-400/15 via-transparent to-transparent rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-[15%] right-[10%] w-48 h-48 md:w-80 md:h-80 bg-gradient-radial from-coffee-500/10 via-transparent to-transparent rounded-full blur-2xl md:blur-3xl hidden sm:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-radial from-coffee-300/8 to-transparent rounded-full blur-xl md:blur-2xl" />
      </div>

      {/* ========== CONTENU PRINCIPAL - RESPONSIVE ========== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-19 sm:py-16 md:py-30 z-10">
        <div className="text-center">

          {/* Titre - responsive */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-audiowide mb-4 sm:mb-10 tracking-tight">
            <span className="text-txt-title">
              Welcome to
            </span>
            <br/>
            <span className="bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent drop-shadow-sm text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              EventSync
            </span>
          </h1>

          {/* Description - responsive */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-txt-secondary max-w-3xl mx-auto mb-5 sm:mb-5 font-light px-2">
            Discover, create, and participate in events that shape your community.
            <span className="block text-sm sm:text-base text-coffee-500 dark:text-coffee-400 font-medium mt-2">
              Join over 50,000 enthusiasts
            </span>
          </p>

          {/* Boutons - responsive */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center mb-5 sm:mb-12 md:mb-20">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-600 hover:from-coffee-700 hover:via-coffee-600 hover:to-coffee-700 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-medium text-sm sm:text-base"
            >
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl border-2 border-coffee-400 dark:border-coffee-600 text-txt-body hover:bg-coffee-100 dark:hover:bg-coffee-800/50 hover:border-coffee-500 dark:hover:border-coffee-500 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>

          {/* Statistiques - responsive */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className={`p-2 sm:p-3 rounded-full bg-gradient-to-br ${stat.color} dark:from-coffee-700 dark:to-coffee-800 group-hover:from-coffee-600 group-hover:to-coffee-700 dark:group-hover:from-coffee-600 dark:group-hover:to-coffee-700 transition-all duration-300 group-hover:scale-110 shadow-md`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-audiowide bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-400 dark:to-coffee-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-txt-secondary mt-0.5 sm:mt-1 font-medium">
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