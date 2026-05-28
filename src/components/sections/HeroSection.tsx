// app/components/sections/HeroSection.tsx (version colorée et dynamique)
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
    { value: '500+', label: 'Événements', icon: CalendarDays, color: 'from-coffee-500 to-coffee-600' },
    { value: '50k+', label: 'Participants', icon: Users, color: 'from-coffee-400 to-coffee-500' },
    { value: '120+', label: 'Villes', icon: MapPin, color: 'from-coffee-500 to-coffee-700' },
    { value: '98%', label: 'Satisfaction', icon: ThumbsUp, color: 'from-coffee-400 to-coffee-600' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* ========== FOND PRINCIPAL AVEC DÉGRADÉ COLORÉ ========== */}
      <div className="absolute inset-0" />
      
      {/* ========== CERCLES COLORÉS ========== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full border-4 border-coffee-400/30 dark:border-coffee-500/20 animate-spin-slow" />
        <div className="absolute -top-1/3 -right-1/3 w-[600px] h-[600px] rounded-full border-4 border-coffee-500/25 dark:border-coffee-400/30 animate-spin-slower" />
        <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full border-4 border-coffee-600/20 dark:border-coffee-300/40 animate-spin-slowest" />
        
        {/* Cercles colorés à gauche */}
        <div className="absolute -bottom-1/2 -left-1/2 w-[700px] h-[700px] rounded-full border-4 border-coffee-400/20 dark:border-coffee-500/15" />
        <div className="absolute -bottom-1/3 -left-1/3 w-[500px] h-[500px] rounded-full border-4 border-coffee-500/15 dark:border-coffee-400/25" />
        
        {/* Cercle central avec dégradé */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-radial from-coffee-400/10 via-coffee-500/5 to-transparent" />
      </div>

      {/* ========== LIGNES DIAGONALES COLORÉES ========== */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.08] dark:opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" className="text-coffee-500" />
              <line x1="25" y1="0" x2="50" y2="25" stroke="currentColor" strokeWidth="1" className="text-coffee-600" />
              <line x1="0" y1="25" x2="25" y2="50" stroke="currentColor" strokeWidth="1" className="text-coffee-600" />
              <line x1="10" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-coffee-700" />
              <line x1="0" y1="10" x2="40" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-coffee-700" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      {/* ========== TRIANGLES COLORÉS ========== */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 w-128 h-128 opacity-[0.1] dark:opacity-[0.15]" viewBox="0 0 200 200">
          <polygon points="0,200 200,200 100,100" fill="none" stroke="currentColor" strokeWidth="3" className="text-coffee-500" />
          <polygon points="0,140 140,140 70,70" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
          <polygon points="0,80 80,80 40,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-700" />
          <polygon points="0,20 20,20 10,10" fill="currentColor" className="text-coffee-800/50" />
        </svg>
        
        <svg className="absolute top-0 right-0 w-128 h-128 opacity-[0.1] dark:opacity-[0.15]" viewBox="0 0 200 200">
          <polygon points="200,0 0,0 100,100" fill="none" stroke="currentColor" strokeWidth="3" className="text-coffee-500" />
          <polygon points="200,60 60,60 130,130" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
          <polygon points="200,120 120,120 160,160" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-700" />
        </svg>
      </div>

      {/* ========== HEXAGONES MODERNES ========== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/5 w-48 h-48 opacity-[0.12] dark:opacity-[0.15]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
            <polygon points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5" fill="currentColor" className="text-coffee-400/40" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 opacity-[0.12] dark:opacity-[0.15]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
          </svg>
        </div>
      </div>

      {/* ========== GRILLE DE POINTS COLORÉE ========== */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.08] dark:opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-coffee-500" />
              <circle cx="0" cy="0" r="1" fill="currentColor" className="text-coffee-600" />
              <circle cx="40" cy="0" r="1" fill="currentColor" className="text-coffee-600" />
              <circle cx="0" cy="40" r="1" fill="currentColor" className="text-coffee-600" />
              <circle cx="40" cy="40" r="1" fill="currentColor" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* ========== RAYONS LUMINEUX ========== */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-coffee-400/20 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-coffee-500/15 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-coffee-300/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* ========== CONTENU PRINCIPAL ========== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center">
          
          {/* Badge amélioré */}
          <div className="inline-flex items-center gap-2 bg-coffee-100/90 dark:bg-coffee-800/70 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-coffee-200 dark:border-coffee-700 shadow-lg">
            <Sparkles className="w-4 h-4 text-coffee-600 dark:text-coffee-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-coffee-700 to-coffee-600 dark:from-coffee-300 dark:to-coffee-400 bg-clip-text text-transparent">
              ✨ Plateforme événementielle nouvelle génération
            </span>
          </div>

          {/* Titre avec dégradé amélioré */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-audiowide mb-6 tracking-tight">
            <span className="text-txt-title">Bienvenue sur</span>
            <br />
            <span className="bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent drop-shadow-sm">
              EventSync
            </span>
          </h1>

          {/* Description avec plus de contraste */}
          <p className="text-lg sm:text-xl lg:text-2xl text-txt-secondary max-w-3xl mx-auto mb-12 font-light">
            Découvrez, créez et participez aux événements qui façonnent votre communauté.
            <span className="block text-base text-coffee-500 dark:text-coffee-400 font-medium mt-2">
              Rejoignez plus de 50,000 passionnés
            </span>
          </p>

          {/* Boutons avec couleurs améliorées */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-600 hover:from-coffee-700 hover:via-coffee-600 hover:to-coffee-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-medium"
            >
              <CalendarDays className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Explorer les événements</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-coffee-400 dark:border-coffee-600 text-txt-body hover:bg-coffee-100 dark:hover:bg-coffee-800/50 hover:border-coffee-500 dark:hover:border-coffee-500 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              En savoir plus
            </Link>
          </div>

          {/* Statistiques avec couleurs individuelles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color} dark:from-coffee-700 dark:to-coffee-800 group-hover:from-coffee-600 group-hover:to-coffee-700 dark:group-hover:from-coffee-600 dark:group-hover:to-coffee-700 transition-all duration-300 group-hover:scale-110 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-audiowide bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-400 dark:to-coffee-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-txt-secondary mt-1 font-medium">
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