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
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
            : 'bg-background border-b border-border/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-2.5 transition-transform active:scale-95"
            >
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-coffee-600 to-coffee-700 rounded-xl flex items-center justify-center shadow-lg shadow-coffee-500/20 group-hover:shadow-coffee-500/30 transition-all duration-300 group-hover:scale-105">
                <h2 className="text-white font-audiowide text-lg lg:text-xl tracking-tight">
                  ES
                </h2>
              </div>
              <div className="font-audiowide text-xl lg:text-2xl tracking-tight">
                <span className="text-foreground">Event</span>
                <span className="bg-gradient-to-r from-coffee-500 to-coffee-600 bg-clip-text text-transparent">
                  Sync
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 lg:px-5 py-2 font-audiowide text-sm lg:text-base font-medium transition-all duration-200 rounded-lg group ${
                      isActive
                        ? 'text-coffee-600 dark:text-coffee-400'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-coffee-600 dark:bg-coffee-400 rounded-full" />
                    )}
                    <span className="absolute inset-0 rounded-lg bg-coffee-500/0 group-hover:bg-coffee-500/5 dark:group-hover:bg-coffee-400/5 transition-all duration-200" />
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-audiowide transition-all duration-200 transform ${
                  isActive
                    ? 'text-coffee-600 dark:text-coffee-400 scale-110'
                    : 'text-muted-foreground hover:text-foreground hover:scale-105'
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