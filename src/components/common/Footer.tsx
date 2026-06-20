import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-coffee-200 dark:border-coffee-800 bg-background/80 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & description */}
          <div className="space-y-3">
            <div className="font-audiowide text-lg sm:text-xl">
              <span className="text-foreground">Event</span>
              <span className="bg-gradient-to-r from-coffee-500 to-coffee-600 bg-clip-text text-transparent">
                Sync
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time event management platform. Create, share, and participate in events that bring your community together.
            </p>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
               
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
            
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-audiowide text-sm font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/events" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Events
              
              </Link></li>
              <li><Link href="/planning" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Planning</Link></li>
              <li><Link href="/speakers" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Speakers</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-audiowide text-sm font-semibold text-foreground mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">API</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Status</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-audiowide text-sm font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Confidentiality</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Cookies</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-coffee-600 dark:hover:text-coffee-400 transition-colors">Legal Notices</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-coffee-200 dark:border-coffee-800 mt-8 pt-6 text-center text-xs text-muted-foreground">
          <p>© {currentYear} EventSync – All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}