'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Event } from '@/types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatFullDate, formatTime, isLive } from '@/lib/utils';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/api/events');
      const data = response.data?.data ?? response.data ?? [];
      
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Erreur lors du chargement des événements:", err);
      setError("Impossible de charger les événements. Vérifiez que le backend est démarré.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const hasLiveSession = useCallback((event: Event): boolean => {
    if (!event.sessions || event.sessions.length === 0) return false;
    return event.sessions.some((session) =>
      isLive(new Date(session.startTime), new Date(session.endTime))
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-600 text-xl mb-6">{error}</p>
          <button 
            onClick={fetchEvents}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Nos Événements
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les événements à venir et en cours sur EventSync
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              const isCurrentlyLive = hasLiveSession(event);
              const sessionCount = event.sessions?.length || 0;

              return (
                <Link 
                  key={event.id} 
                  href={`/events/${event.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                    
                    {/* Badge LIVE */}
                    {isCurrentlyLive && (
                      <div className="bg-red-600 text-white text-sm font-semibold px-6 py-2.5 flex items-center gap-2">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        ÉVÉNEMENT EN COURS
                      </div>
                    )}

                    <div className="p-8 flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5em]">
                        {event.title}
                      </h2>

                      <p className="text-gray-600 mb-8 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-4">
                          <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">Date</p>
                            <p className="text-gray-600">{formatFullDate(event.startDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">Horaires</p>
                            <p className="text-gray-600">
                              {formatTime(event.startDate)} — {formatTime(event.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-700">Lieu</p>
                            <p className="text-gray-600">{event.location}</p>
                          </div>
                        </div>

                        {sessionCount > 0 && (
                          <div className="flex items-start gap-4">
                            <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-700">Sessions</p>
                              <p className="text-gray-600">{sessionCount} session{sessionCount > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 px-8 py-5 bg-gray-50 flex items-center justify-between mt-auto">
                      <div className="text-sm text-gray-500">
                        {sessionCount} session{sessionCount > 1 ? 's' : ''}
                      </div>
                      <div className="text-blue-600 font-medium group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                        Voir le détail →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-400">Aucun événement disponible pour le moment.</p>
            <p className="text-gray-500 mt-2">Revenez bientôt !</p>
          </div>
        )}
      </div>
    </div>
  );
}