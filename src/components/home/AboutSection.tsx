import { Sparkles, Users, Calendar, Globe, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-background w-full overflow-hidden">
      {/* Fond avec pattern - identique à EventSection */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête - exactement comme EventSection */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-500 to-coffee-600 flex items-center justify-center shadow-lg shadow-coffee-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                About
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-coffee-900 dark:text-white tracking-tight">
              About <span className="bg-gradient-to-r from-coffee-600 to-coffee-700 dark:from-coffee-300 dark:to-coffee-200 bg-clip-text text-transparent">EventSync</span>
            </h2>
            <p className="text-coffee-500 dark:text-coffee-400 mt-2 text-lg">
              Connecting people through unforgettable events
            </p>
          </div>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-coffee-200 dark:border-coffee-700 hover:border-coffee-500 dark:hover:border-coffee-500 transition-all duration-200 text-coffee-700 dark:text-coffee-300 font-medium hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-coffee-900/30"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Contenu original */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Texte - 3 colonnes */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/70 dark:bg-coffee-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-coffee-100/50 dark:border-coffee-800/50">
              <p className="text-coffee-700 dark:text-coffee-300 leading-relaxed text-base md:text-lg">
                EventSync is a cutting-edge platform designed to revolutionize the way we 
                discover, create, and participate in events. Our mission is to connect people 
                with the events that matter most to them, fostering community engagement and 
                enriching lives through shared experiences.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-coffee-900/40 backdrop-blur-sm rounded-2xl p-6 border border-coffee-100/50 dark:border-coffee-800/50 hover:border-coffee-300 dark:hover:border-coffee-700 transition-colors hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 dark:text-white mb-1">Community First</h3>
                    <p className="text-sm text-coffee-500 dark:text-coffee-400">Building connections that last</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-coffee-900/40 backdrop-blur-sm rounded-2xl p-6 border border-coffee-100/50 dark:border-coffee-800/50 hover:border-coffee-300 dark:hover:border-coffee-700 transition-colors hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 dark:text-white mb-1">Seamless Events</h3>
                    <p className="text-sm text-coffee-500 dark:text-coffee-400">Create and manage with ease</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-coffee-900/40 backdrop-blur-sm rounded-2xl p-6 border border-coffee-100/50 dark:border-coffee-800/50 hover:border-coffee-300 dark:hover:border-coffee-700 transition-colors hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 dark:text-white mb-1">Global Reach</h3>
                    <p className="text-sm text-coffee-500 dark:text-coffee-400">Connect worldwide</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-coffee-900/40 backdrop-blur-sm rounded-2xl p-6 border border-coffee-100/50 dark:border-coffee-800/50 hover:border-coffee-300 dark:hover:border-coffee-700 transition-colors hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 dark:text-white mb-1">Made with Love</h3>
                    <p className="text-sm text-coffee-500 dark:text-coffee-400">Passion for experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 2 colonnes */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-coffee-50 to-coffee-100/50 dark:from-coffee-900/50 dark:to-coffee-800/30 rounded-2xl p-6 md:p-8 border border-coffee-200/50 dark:border-coffee-800/50 sticky top-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-coffee-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-coffee-600 dark:text-coffee-400 leading-relaxed mb-6">
                To connect people with the events that matter most, fostering community 
                engagement and enriching lives through shared experiences.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-coffee-600 dark:text-coffee-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-coffee-500" />
                  <span>Innovation at our core</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-coffee-600 dark:text-coffee-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-coffee-500" />
                  <span>Community-driven development</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-coffee-600 dark:text-coffee-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-coffee-500" />
                  <span>Exceptional user experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-coffee-600 dark:text-coffee-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-coffee-500" />
                  <span>Global community engagement</span>
                </div>
              </div>

              <Link
                href="/events"
                className="group mt-6 inline-flex items-center gap-2 text-coffee-600 dark:text-coffee-400 hover:text-coffee-800 dark:hover:text-coffee-200 font-medium transition-colors"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}