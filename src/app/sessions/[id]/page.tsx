'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, User, ArrowLeft, Link as LinkIcon, Tag, Video, CheckCircle } from 'lucide-react';
import { formatHour, formatDate, isLiveSession } from '@/lib/utils';
import api from '@/lib/api';
import { Session } from '@/types';

export default function SessionDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/api/sessions/${id}`);
                const sessionData = response.data?.data || response.data;
                setSession(sessionData);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les détails de la session");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSession();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement de la session...</p>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="bg-red-50 rounded-2xl p-8">
                        <p className="text-red-600 text-lg mb-4">{error || "Session non trouvée"}</p>
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isLive = isLiveSession(session.startTime, session.endTime);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au planning
                </button>

                <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
                    <div className={`relative p-8 ${isLive ? 'bg-gradient-to-r from-red-50 to-orange-50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    {isLive && (
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            EN DIRECT
                                        </span>
                                    )}
                                    {session.event && (
                                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                                            {session.event.title}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    {session.title}
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {session.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Date */}
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                                    <p className="text-gray-900 font-medium">{formatDate(session.startTime)}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Horaire</p>
                                    <p className="text-gray-900 font-medium">
                                        {formatHour(session.startTime)} - {formatHour(session.endTime)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Salle</p>
                                    <p className="text-gray-900 font-medium">{session.room?.name || 'Non définie'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-1">Capacité</p>
                                    <p className="text-gray-900 font-medium">{session.capacity} places</p>
                                </div>
                            </div>
                        </div>

                        {session.speakers && session.speakers.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">Intervenants</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {session.speakers.map((speaker) => (
                                        <div key={speaker.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {speaker.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{speaker.fullName}</p>
                                                <p className="text-sm text-gray-500">{speaker.bio || 'Intervenant'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {session.event && (
                            <div className="pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-500">Événement :</span>
                                        <span className="font-medium text-gray-900">{session.event.title}</span>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/events/${session.event?.id}`)}
                                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Voir l'événement
                                        <LinkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}