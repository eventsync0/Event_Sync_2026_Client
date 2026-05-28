'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/planning', label: 'Planning' },
    { href: '/speakers', label: 'Speakers' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        } ` } 
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
            
            {/* Logo - gauche */}
            <Link 
              href="/" 
              className="group flex items-center gap-2 transition-transform active:scale-95 shrink-0 "
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-br from-coffee-600 to-coffee-700 rounded-lg flex items-center justify-center shadow-md shadow-coffee-500/20 group-hover:shadow-coffee-500/30 transition-all duration-300 group-hover:scale-105">
                <h2 className="text-white font-audiowide text-xs sm:text-sm md:text-base tracking-tight">
                  ES
                </h2>
              </div>
              <div className="font-audiowide text-xs sm:text-sm md:text-base lg:text-lg tracking-tight">
                <span className="text-foreground">Event</span>
                <span className="bg-gradient-to-r from-coffee-500 to-coffee-600 bg-clip-text text-transparent">
                  Sync
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - centrée */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-0.5 lg:gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-2.5 lg:px-3.5 py-1.5 font-audiowide text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-200 rounded-lg group ${
                        isActive
                          ? 'text-coffee-600 dark:text-coffee-400'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-coffee-600 dark:bg-coffee-400 rounded-full" />
                      )}
                      <span className="absolute inset-0 rounded-lg bg-coffee-500/0 group-hover:bg-coffee-500/5 dark:group-hover:bg-coffee-400/5 transition-all duration-200" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Section - droite */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg hover:bg-accent transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - centré */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base sm:text-lg md:text-xl font-audiowide transition-all duration-200 transform ${
                  isActive
                    ? 'text-coffee-600 dark:text-coffee-400 scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:scale-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}