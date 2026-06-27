'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, User, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import api from '@/lib/api';
import { Session } from '@/types';
import { formatHour, isLiveSession } from '@/lib/utils';
import { getFavoriteIds } from '@/lib/favoritesService';

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

    const getSessionColor = (sessionId: string) => {
        const colors = [
            'bg-blue-100 hover:bg-blue-200 text-blue-900',
            'bg-green-100 hover:bg-green-200 text-green-900',
            'bg-orange-100 hover:bg-orange-200 text-orange-900',
            'bg-purple-100 hover:bg-purple-200 text-purple-900',
            'bg-red-100 hover:bg-red-200 text-red-900',
            'bg-yellow-100 hover:bg-yellow-200 text-yellow-900',
            'bg-pink-100 hover:bg-pink-200 text-pink-900',
            'bg-indigo-100 hover:bg-indigo-200 text-indigo-900',
            'bg-teal-100 hover:bg-teal-200 text-teal-900',
            'bg-cyan-100 hover:bg-cyan-200 text-cyan-900',
        ];

        const hash = sessionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
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

            <div className="max-w-7xl mx-auto px-4 py-6">
                {sessions.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-400">No events available at the moment.</p>
                        <p className="text-gray-500 mt-2">Please check back soon!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="grid grid-cols-7 border-b">
                            {weekDays.map((day, idx) => {
                                const isToday = day.toDateString() === new Date().toDateString();
                                const sessionsForDay = getSessionsForDay(day);

                                return (
                                    <div key={idx} className={`p-3 text-center border-r last:border-r-0 ${isToday ? 'bg-blue-50' : ''}`}>
                                        <div className="font-semibold text-gray-700">
                                            {day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}
                                        </div>
                                        <div className={`text-2xl font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                                            {day.getDate()}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {day.toLocaleDateString('fr-FR', { month: 'short' })}
                                        </div>
                                        {sessionsForDay.length > 0 && (
                                            <div className="mt-1 text-xs text-blue-600 font-medium">
                                                {sessionsForDay.length} session{sessionsForDay.length > 1 ? 's' : ''}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-7 min-h-[600px]">
                            {weekDays.map((day, dayIdx) => {
                                const sessionsForDay = getSessionsForDay(day);
                                const hours = Array.from({ length: 14 }, (_, i) => i + 7);

                                return (
                                    <div key={dayIdx} className={`border-r last:border-r-0 ${dayIdx === 6 ? 'border-r-0' : ''}`}>
                                        <div className="relative min-h-[600px]">
                                            {hours.map((hour) => (
                                                <div key={hour} className="border-b border-gray-100 h-16 relative">
                                                    <span className="absolute -top-3 left-1 text-xs text-gray-400 bg-white px-1">
                                                        {hour}:00
                                                    </span>
                                                </div>
                                            ))}

                                            {sessionsForDay.map((session) => {
                                                const sessionHour = new Date(session.startTime).getHours();
                                                const sessionMinute = new Date(session.startTime).getMinutes();
                                                const topPosition = (sessionHour - 7) * 64 + (sessionMinute / 60) * 64;
                                                const height = getSessionHeight(session.startTime, session.endTime);
                                                
                                                const isFav = getFavoriteIds().includes(session.id);

                                                return (
                                                    <div
                                                        key={session.id}
                                                        className={`absolute left-1 right-1 rounded-lg p-2 overflow-hidden transition cursor-pointer group ${getSessionColor(session.id)}`}
                                                        style={{
                                                            top: `${topPosition}px`,
                                                            height: `${height}px`,
                                                            minHeight: '40px'
                                                        }}
                                                    >
                                                        <Link href={`/sessions/${session.id}`}>
                                                            <div className="flex justify-between items-start gap-1">
                                                                <div className="text-xs font-semibold truncate flex-1">
                                                                    {session.title}
                                                                </div>
                                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                                    {isFav && (
                                                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                                    )}
                                                                    {isLiveSession(session.startTime, session.endTime) && (
                                                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs mt-1">
                                                                {formatHour(session.startTime)} - {formatHour(session.endTime)}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}