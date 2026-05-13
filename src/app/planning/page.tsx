// app/planning/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, User, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import { Session } from '@/types';

export default function PlanningPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/sessions');

                let sessionsData = [];
                if (Array.isArray(response.data)) {
                    sessionsData = response.data;
                } else if (response.data?.data && Array.isArray(response.data.data)) {
                    sessionsData = response.data.data;
                } else if (response.data?.sessions && Array.isArray(response.data.sessions)) {
                    sessionsData = response.data.sessions;
                }

                setSessions(sessionsData);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger le planning");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const previousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const currentWeek = () => {
        setCurrentDate(new Date());
    };

    const getWeekDays = (date: Date) => {
        const startOfWeek = new Date(date);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + i);
            weekDays.push(dayDate);
        }
        return weekDays;
    };

    const formatHour = (date: string) => {
        return new Date(date).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getSessionsForDay = (day: Date) => {
        return sessions
            .filter(session => {
                const sessionDate = new Date(session.startTime);
                return sessionDate.toDateString() === day.toDateString();
            })
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    };

    const getSessionHeight = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return Math.max(40, durationMinutes * 1.5);
    };

    const weekDays = getWeekDays(currentDate);
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement du planning...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-600">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={previousWeek}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={currentWeek}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                            >
                                Aujourd'hui
                            </button>
                            <button
                                onClick={nextWeek}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                        {weekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} -{' '}
                        {weekEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {sessions.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-400">No events available at the moment.</p>
                        <p className="text-gray-500 mt-2">Please check back soon!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {session.title}
                                        </h2>
                                        <p className="text-gray-600">{session.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">
                                            {new Date(session.startTime).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long'
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">
                                            {new Date(session.startTime).toLocaleTimeString('fr-FR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })} - {new Date(session.endTime).toLocaleTimeString('fr-FR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">{session.room?.name || 'Salle non définie'}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm">{session.capacity} places</span>
                                    </div>
                                </div>

                                {session.speakers && session.speakers.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium">Speakers:</span>
                                            <span className="text-sm">
                                                {session.speakers.map(s => s.fullName).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* ✅ CORRECTION : Vérifie si event existe avant d'afficher le lien */}
                                {session.event && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Link
                                            href={`/events/${session.event.id}`}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Voir l'événement →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}