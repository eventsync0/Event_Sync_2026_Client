'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, User, ArrowLeft } from 'lucide-react';
import { formatHour, isLiveSession } from '@/lib/utils';
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-600">
                    <p>{error || "Session non trouvée"}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    const isLive = isLiveSession(session.startTime, session.endTime);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </button>

                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
                            {isLive && (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                    LIVE
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mt-2">{session.description}</p>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span>
                                {new Date(session.startTime).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>
                                {formatHour(session.startTime)} - {formatHour(session.endTime)}
                            </span>
                        </div>

                        {session.room && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span>{session.room.name}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 text-gray-600">
                            <Users className="w-5 h-5 text-blue-600" />
                            <span>{session.capacity} places</span>
                        </div>

                        {session.speakers && session.speakers.length > 0 && (
                            <div className="flex items-start gap-3 text-gray-600">
                                <User className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-medium">Speakers</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {session.speakers.map((speaker) => (
                                            <span key={speaker.id} className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                                                {speaker.fullName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {session.event && (
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-sm text-gray-500">
                                    Événement :{' '}
                                    <span className="font-medium text-gray-700">{session.event.title}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}