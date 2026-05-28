'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-coffee-600 rounded-full flex items-center justify-center">
             <h2 className="text-white font-family">ES</h2>
            </div>
            <div className="font-family text-2xl text-gray-900">Event<span className="text-coffee-500">.Sync</span></div>
          </Link>


          <div className="flex items-center gap-8">
          <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Events
            </Link>
            <Link 
              href="/planning" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Planning
            </Link>
            <Link 
            href="/speakers"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Speakers
            </Link>
          </div>

          {/* <Link 
            href="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-medium"
          >
            <User className="w-5 h-5" />
            Organisateur
          </Link> */}

        </div>
      </div>
    </nav>
  );
}