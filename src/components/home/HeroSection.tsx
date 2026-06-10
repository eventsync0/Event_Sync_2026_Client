import Link from "next/link";
import {
  CalendarDays,
  Users,
  MapPin,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  const stats = [
    { value: "500+", label: "Events", icon: CalendarDays, color: "from-coffee-500 to-coffee-600" },
    { value: "50k+", label: "Participants", icon: Users, color: "from-coffee-400 to-coffee-500" },
    { value: "120+", label: "Cities", icon: MapPin, color: "from-coffee-500 to-coffee-700" },
    { value: "98%", label: "Satisfaction", icon: ThumbsUp, color: "from-coffee-400 to-coffee-600" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ARRIÈRE-PLAN DÉCORATIF — inchangé */}
      <div className="absolute inset-0 dark:from-coffee-950 dark:via-coffee-900/80 dark:to-coffee-800/60" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[600px] h-[600px] rounded-full border-4 border-coffee-400/50 dark:border-coffee-500/40 animate-spin-slow hidden lg:block" />
        <div className="absolute -top-1/3 -right-1/3 w-[450px] h-[450px] rounded-full border-4 border-coffee-500/40 dark:border-coffee-400/40 animate-spin-slower hidden md:block" />
        <div className="absolute -top-1/4 -right-1/4 w-[300px] h-[300px] rounded-full border-4 border-coffee-600/30 dark:border-coffee-300/50 animate-spin-slowest hidden sm:block" />
        <div className="absolute -top-1/4 -right-1/4 w-[220px] h-[220px] rounded-full border-3 border-coffee-400/30 dark:border-coffee-500/25 block lg:hidden" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[180px] h-[180px] rounded-full border-3 border-coffee-500/25 dark:border-coffee-400/30 block md:hidden" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] rounded-full border-4 border-coffee-400/30 dark:border-coffee-500/25 hidden xl:block" />
        <div className="absolute -bottom-1/3 -left-1/3 w-[350px] h-[350px] rounded-full border-4 border-coffee-500/25 dark:border-coffee-400/35 hidden lg:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full bg-gradient-radial from-coffee-400/20 via-coffee-500/10 to-transparent blur-2xl" />
      </div>

      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.12] md:opacity-[0.15] dark:opacity-[0.15] dark:md:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="30" y2="30" stroke="currentColor" strokeWidth="1.2" className="text-coffee-500" />
              <line x1="15" y1="0" x2="30" y2="15" stroke="currentColor" strokeWidth="0.8" className="text-coffee-600" />
              <line x1="0" y1="15" x2="15" y2="30" stroke="currentColor" strokeWidth="0.8" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 opacity-[0.12] dark:opacity-[0.16]" viewBox="0 0 200 200">
          <polygon points="0,200 200,200 100,100" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-coffee-500" />
          <polygon points="0,140 140,140 70,70" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
          <polygon points="0,80 80,80 40,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-700" />
        </svg>
        <svg className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 opacity-[0.12] dark:opacity-[0.16]" viewBox="0 0 200 200">
          <polygon points="200,0 0,0 100,100" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-coffee-500" />
          <polygon points="200,60 60,60 130,130" fill="none" stroke="currentColor" strokeWidth="2" className="text-coffee-600" />
          <polygon points="200,120 120,120 160,160" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-coffee-700" />
        </svg>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 opacity-[0.12] dark:opacity-[0.16]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-coffee-600" />
          </svg>
        </div>
        <div className="absolute bottom-[20%] right-[10%] w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 opacity-[0.12] dark:opacity-[0.16] hidden sm:block">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-coffee-500" />
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-coffee-600" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.1] md:opacity-[0.12] dark:opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="2" fill="currentColor" className="text-coffee-500" />
              <circle cx="0" cy="0" r="1.2" fill="currentColor" className="text-coffee-600" />
              <circle cx="25" cy="0" r="1.2" fill="currentColor" className="text-coffee-600" />
              <circle cx="0" cy="25" r="1.2" fill="currentColor" className="text-coffee-600" />
              <circle cx="25" cy="25" r="1.2" fill="currentColor" className="text-coffee-600" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[15%] w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gradient-radial from-coffee-400/25 via-transparent to-transparent rounded-full blur-md md:blur-xl" />
        <div className="absolute bottom-[15%] right-[10%] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gradient-radial from-coffee-500/20 via-transparent to-transparent rounded-full blur-md md:blur-xl hidden sm:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] bg-gradient-radial from-coffee-300/15 to-transparent rounded-full blur-lg md:blur-xl" />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative w-full text-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-32 z-10">

        {/* Titre */}
        <h1 className="
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
          font-audiowide
          mb-3 sm:mb-4 md:mb-5 lg:mb-6
          tracking-tight leading-tight
        ">
          <span className="text-txt-title">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-700 bg-clip-text text-transparent drop-shadow-sm">
              EventSync
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="
          font-semibold
          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
          text-txt-secondary
          max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto
          mb-4 sm:mb-5 md:mb-6 lg:mb-7
          px-2 sm:px-0
        ">
          Discover and participate in events that shape your community.
          <span className="
            block
            text-[10px] sm:text-xs
            text-coffee-500 dark:text-coffee-400
            font-medium
            mt-0.5 sm:mt-1
          ">
            Join us and be part of unforgettable experiences!
          </span>
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <Link
            href="/events"
            className="group inline-flex items-center gap-1.5 bg-gradient-to-r from-coffee-600 via-coffee-500 to-coffee-600 hover:from-coffee-700 hover:via-coffee-600 hover:to-coffee-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 font-medium
              px-4 py-2 text-xs min-h-[36px]
              sm:px-5 sm:py-2.5 sm:text-sm sm:min-h-[40px]
              md:px-6 md:py-2.5 md:text-sm md:min-h-[42px]
              lg:px-7 lg:py-3 lg:text-base lg:min-h-[46px]
            "
          >
            <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-12" />
            <span>Explore Events</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 border-2 border-coffee-400 dark:border-coffee-600 text-txt-body hover:bg-coffee-100 dark:hover:bg-coffee-800/50 hover:border-coffee-500 dark:hover:border-coffee-500 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium
              px-4 py-2 text-xs min-h-[36px]
              sm:px-5 sm:py-2.5 sm:text-sm sm:min-h-[40px]
              md:px-6 md:py-2.5 md:text-sm md:min-h-[42px]
              lg:px-7 lg:py-3 lg:text-base lg:min-h-[46px]
            "
          >
            Learn More
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-1 sm:mb-1.5 md:mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-full bg-gradient-to-br ${stat.color} dark:from-coffee-700 dark:to-coffee-800 group-hover:from-coffee-600 group-hover:to-coffee-700 dark:group-hover:from-coffee-600 dark:group-hover:to-coffee-700 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                </div>
                <div className="
                  font-audiowide
                  bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-400 dark:to-coffee-500 bg-clip-text text-transparent
                  text-sm sm:text-base md:text-lg lg:text-xl
                ">
                  {stat.value}
                </div>
                <div className="
                  text-txt-secondary font-medium mt-0.5
                  text-[9px] sm:text-[10px] md:text-xs
                ">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}