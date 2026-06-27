'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Filter, LayoutGrid, List } from 'lucide-react';
import api from '@/lib/api';
import { Session, Room } from '@/types';
import { formatHour, isLiveSession } from '@/lib/utils';

export default function PlanningPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [viewMode, setViewMode] = useState<'week' | 'multitrack'>('week');
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const roomsResponse = await api.get('/api/rooms');
                const roomsData = roomsResponse.data?.data || [];
                setRooms(roomsData);

                await fetchSessions();
            } catch (err) {
                console.error(err);
                setError("Impossible de charger le planning");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchSessions = async (roomId?: string) => {
        try {
            let url = '/api/sessions';
            if (roomId) {
                url = `/api/sessions/room/${roomId}`;
            }

            const response = await api.get(url);
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
            console.error('Error fetching sessions:', err);
            throw err;
        }
    };

    const handleRoomFilter = async (roomId: string) => {
        setSelectedRoom(roomId);
        await fetchSessions(roomId || undefined);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'week' ? 'multitrack' : 'week');
    };

    const goToPreviousDay = () => {
        const newDate = new Date(selectedDay);
        newDate.setDate(selectedDay.getDate() - 1);
        setSelectedDay(newDate);
    };

    const goToNextDay = () => {
        const newDate = new Date(selectedDay);
        newDate.setDate(selectedDay.getDate() + 1);
        setSelectedDay(newDate);
    };

    const goToToday = () => {
        setSelectedDay(new Date());
    };

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

    const getSessionsByRoomForDay = (day: Date) => {
        const daySessions = getSessionsForDay(day);
        const roomsMap: { [key: string]: Session[] } = {};

        rooms.forEach(room => {
            roomsMap[room.id] = [];
        });

        daySessions.forEach(session => {
            if (session.roomId && roomsMap[session.roomId]) {
                roomsMap[session.roomId].push(session);
            }
        });

        return roomsMap;
    };

    const getSessionHeight = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return Math.max(40, durationMinutes * 1.5);
    };

    const getSessionColor = (sessionId: string) => {
    const colors = [
        'bg-gray-800 hover:bg-gray-700 text-gray-100',
        'bg-gray-700 hover:bg-gray-600 text-gray-100',
        'bg-gray-600 hover:bg-gray-500 text-gray-100',
        'bg-stone-800 hover:bg-stone-700 text-stone-100',
        'bg-stone-700 hover:bg-stone-600 text-stone-100',
        'bg-zinc-800 hover:bg-zinc-700 text-zinc-100',
        'bg-zinc-700 hover:bg-zinc-600 text-zinc-100',
    ];
    const hash = sessionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
};

    const weekDays = getWeekDays(currentDate);
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-coffee-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-coffee-400">Chargement du planning...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-black mt-16 pb-12">
            {/* Header */}
            <div className="border-b border-coffee-900 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h1 className="text-4xl md:text-5xl font-audiowide bg-gradient-to-r from-coffee-400 via-coffee-300 to-coffee-500 bg-clip-text text-transparent tracking-tight">
                            Planning
                        </h1>
                        <div className="flex items-center gap-4 flex-wrap">
                            {rooms.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-coffee-400" />
                                    <select
                                        value={selectedRoom}
                                        onChange={(e) => handleRoomFilter(e.target.value)}
                                        className="px-3 py-1.5 border border-coffee-800 rounded-lg text-sm bg-black text-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                                    >
                                        <option value="">Toutes les salles</option>
                                        {rooms.map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={toggleViewMode}
                                className="flex items-center gap-1.5 px-3 py-1.5 border border-coffee-800 rounded-lg text-sm hover:bg-coffee-900/50 transition text-coffee-300"
                            >
                                {viewMode === 'week' ? (
                                    <>
                                        <LayoutGrid className="w-4 h-4" />
                                        <span>Vue Multi-Track</span>
                                    </>
                                ) : (
                                    <>
                                        <List className="w-4 h-4" />
                                        <span>Vue Semaine</span>
                                    </>
                                )}
                            </button>

                            {viewMode === 'week' ? (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={previousWeek}
                                        className="p-2 hover:bg-coffee-900/50 rounded-full transition text-coffee-400"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={currentWeek}
                                        className="px-3 py-1.5 text-sm bg-coffee-900/50 hover:bg-coffee-800/50 rounded-lg transition text-coffee-300 font-medium"
                                    >
                                        Aujourd'hui
                                    </button>
                                    <button
                                        onClick={nextWeek}
                                        className="p-2 hover:bg-coffee-900/50 rounded-full transition text-coffee-400"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={goToPreviousDay}
                                        className="p-2 hover:bg-coffee-900/50 rounded-full transition text-coffee-400"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={goToToday}
                                        className="px-3 py-1.5 text-sm bg-coffee-900/50 hover:bg-coffee-800/50 rounded-lg transition text-coffee-300 font-medium"
                                    >
                                        Aujourd'hui
                                    </button>
                                    <button
                                        onClick={goToNextDay}
                                        className="p-2 hover:bg-coffee-900/50 rounded-full transition text-coffee-400"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {viewMode === 'week' ? (
                        <p className="text-coffee-500 text-sm">
                            {weekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} -{' '}
                            {weekEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    ) : (
                        <p className="text-coffee-500 text-sm">
                            {selectedDay.toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                            {selectedDay.toDateString() === new Date().toDateString() && (
                                <span className="ml-2 text-coffee-400 font-semibold">(Aujourd'hui)</span>
                            )}
                        </p>
                    )}
                </div>
            </div>

            {/* Contenu principal */}
            <div className="relative max-w-7xl mx-auto px-4 py-6">
                {sessions.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-coffee-500">Aucune session disponible pour le moment.</p>
                        <p className="text-coffee-600 mt-2">Revenez plus tard !</p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'multitrack' ? (
                            <div className="bg-black rounded-2xl border border-coffee-900 overflow-hidden">
                                <div className="grid border-b border-coffee-900" style={{ gridTemplateColumns: `100px repeat(${rooms.length}, 1fr)` }}>
                                    <div className="p-3 bg-black font-semibold text-sm text-coffee-400 border-r border-coffee-900">
                                        Horaire
                                    </div>
                                    {rooms.map(room => (
                                        <div key={room.id} className="p-3 bg-black font-semibold text-sm text-coffee-300 text-center border-r last:border-r-0 border-coffee-900">
                                            {room.name}
                                        </div>
                                    ))}
                                </div>

                                <div className="relative min-h-[600px]">
                                    {rooms.length > 0 ? (
                                        <div className="grid" style={{ gridTemplateColumns: `100px repeat(${rooms.length}, 1fr)` }}>
                                            <div className="border-r border-coffee-900">
                                                {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
                                                    <div key={hour} className="border-b border-coffee-900 h-16 relative">
                                                        <span className="absolute -top-3 left-2 text-xs text-coffee-600 bg-black px-1">
                                                            {hour}:00
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {rooms.map(room => {
                                                const roomSessions = getSessionsByRoomForDay(selectedDay)[room.id] || [];

                                                return (
                                                    <div key={room.id} className="relative border-r last:border-r-0 border-coffee-900">
                                                        {Array.from({ length: 14 }, (_, i) => i + 7).map(hour => (
                                                            <div key={hour} className="border-b border-coffee-900 h-16"></div>
                                                        ))}

                                                        {roomSessions.map(session => {
                                                            const sessionHour = new Date(session.startTime).getHours();
                                                            const sessionMinute = new Date(session.startTime).getMinutes();
                                                            const topPosition = (sessionHour - 7) * 64 + (sessionMinute / 60) * 64;
                                                            const height = getSessionHeight(session.startTime, session.endTime);

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
                                                                    <Link href={`/sessions/${session.id}`} className="block h-full">
                                                                        <div className="flex flex-col h-full">
                                                                            <div className="flex justify-between items-start gap-1">
                                                                                <div className="text-xs font-semibold truncate text-white">
                                                                                    {session.title}
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-xs mt-1 text-coffee-400">
                                                                                {formatHour(session.startTime)} - {formatHour(session.endTime)}
                                                                            </div>
                                                                            {session.speakers && session.speakers.length > 0 && (
                                                                                <div className="text-[10px] text-coffee-500 mt-0.5 truncate">
                                                                                    👤 {session.speakers.map(s => s.fullName).join(', ')}
                                                                                    {session.speakers.length > 2 && ` +${session.speakers.length - 2}`}
                                                                                </div>
                                                                            )}
                                                                            {isLiveSession(session.startTime, session.endTime) && (
                                                                                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse inline-block mt-1 w-fit">
                                                                                    LIVE
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 text-coffee-500">
                                            Aucune salle disponible
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-black rounded-2xl border border-coffee-900 overflow-hidden">
                                <div className="grid grid-cols-7 border-b border-coffee-900">
                                    {weekDays.map((day, idx) => {
                                        const isToday = day.toDateString() === new Date().toDateString();
                                        const sessionsForDay = getSessionsForDay(day);

                                        return (
                                            <div key={idx} className={`p-3 text-center border-r last:border-r-0 border-coffee-900 ${isToday ? 'bg-coffee-950/50' : ''}`}>
                                                <div className="font-semibold text-coffee-500 text-sm">
                                                    {day.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase()}
                                                </div>
                                                <div className={`text-2xl font-bold ${isToday ? 'text-coffee-400' : 'text-white'}`}>
                                                    {day.getDate()}
                                                </div>
                                                <div className="text-xs text-coffee-600">
                                                    {day.toLocaleDateString('fr-FR', { month: 'short' })}
                                                </div>
                                                {sessionsForDay.length > 0 && (
                                                    <div className="mt-1 text-xs text-coffee-500 font-medium">
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
                                            <div key={dayIdx} className={`border-r last:border-r-0 border-coffee-900 ${dayIdx === 6 ? 'border-r-0' : ''}`}>
                                                <div className="relative min-h-[600px]">
                                                    {hours.map((hour) => (
                                                        <div key={hour} className="border-b border-coffee-900 h-16 relative">
                                                            <span className="absolute -top-3 left-1 text-xs text-coffee-600 bg-black px-1">
                                                                {hour}:00
                                                            </span>
                                                        </div>
                                                    ))}

                                                    {sessionsForDay.map((session) => {
                                                        const sessionHour = new Date(session.startTime).getHours();
                                                        const sessionMinute = new Date(session.startTime).getMinutes();
                                                        const topPosition = (sessionHour - 7) * 64 + (sessionMinute / 60) * 64;
                                                        const height = getSessionHeight(session.startTime, session.endTime);

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
                                                                <Link href={`/sessions/${session.id}`} className="block h-full">
                                                                    <div className="flex flex-col h-full">
                                                                        <div className="flex justify-between items-start gap-1">
                                                                            <div className="text-xs font-semibold truncate text-white">
                                                                                {session.title}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-xs mt-1 text-coffee-400">
                                                                            {formatHour(session.startTime)} - {formatHour(session.endTime)}
                                                                        </div>
                                                                        {session.room && (
                                                                            <div className="text-[10px] text-coffee-500 mt-0.5 truncate">
                                                                                📍 {session.room.name}
                                                                            </div>
                                                                        )}
                                                                        {isLiveSession(session.startTime, session.endTime) && (
                                                                            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full animate-pulse inline-block mt-1 w-fit">
                                                                                LIVE
                                                                            </span>
                                                                        )}
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
                    </>
                )}
            </div>
        </div>
    );
}