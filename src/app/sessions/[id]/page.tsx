'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
    Calendar, Clock, MapPin, Users, User,
    Send, ThumbsUp, MessageSquare, X
} from 'lucide-react';
import { formatHour, formatDate, isLiveSession } from '@/lib/utils';
import api from '@/lib/api';
import { Session } from '@/types';
import { getFavoriteIds, toggleFavorite } from '@/lib/favoritesService';
import {
    getVotedQuestionIds,
    markAsVoted,
    hasAskedSameQuestion,
    markQuestionAsked
} from '../../../lib/Qalocalservice';

export default function SessionDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    const sessionDate = searchParams.get('date');

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isFav, setIsFav] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const [votedQuestions, setVotedQuestions] = useState<string[]>([]);

    const handleClose = () => {
        if (sessionDate) {
            router.push(`/planning?date=${sessionDate}`);
        } else {
            router.push('/planning');
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get(`/api/sessions/${id}`);
            const sessionData = response.data?.data || response.data;
            setSession(sessionData);

            if (sessionData.questions) {
                const sortedQuestions = [...sessionData.questions].sort((a, b) => b.upvotes - a.upvotes);
                setQuestions(sortedQuestions);
            }

            setIsFav(getFavoriteIds().includes(id as string));
            // Restaure les votes déjà effectués par cet appareil/navigateur
            setVotedQuestions(getVotedQuestionIds());
        } catch (err) {
            console.error("Erreur de chargement:", err);
            setError("Impossible de charger les détails de la session.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchData();
    }, [id, fetchData]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (session && isLiveSession(session.startTime, session.endTime)) {
            interval = setInterval(() => {
                api.get(`/api/sessions/${id}`).then(res => {
                    const data = res.data?.data || res.data;
                    setQuestions(data.questions?.sort((a: any, b: any) => b.upvotes - a.upvotes) || []);
                });
            }, 10000);
        }

        return () => clearInterval(interval);
    }, [id, session]);

    const handleToggleFav = () => {
        const state = toggleFavorite(id as string);
        setIsFav(state);
    };

    const handleSendQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newQuestion.trim();
        if (!trimmed || isSending) return;

        setSendError(null);

        // On ne peut pas poser deux fois la même question sur cette session
        if (hasAskedSameQuestion(id as string, trimmed)) {
            setSendError("Vous avez déjà posé cette question pour cette session.");
            return;
        }

        setIsSending(true);
        try {
            const res = await api.post('/api/questions', {
                sessionId: id,
                content: trimmed,
                authorName: authorName.trim() || "Anonyme"
            });

            setQuestions(prev => [res.data, ...prev]);
            markQuestionAsked(id as string, trimmed);
            setNewQuestion('');
            setAuthorName('');
        } catch (err) {
            setSendError("Erreur lors de l'envoi. Assurez-vous que la session est bien en cours.");
        } finally {
            setIsSending(false);
        }
    };

    const handleUpvote = async (qId: string) => {
        // Upvote simple et définitif : un seul vote par question et par
        // appareil/navigateur, sans possibilité de retrait (façon Facebook).
        if (votedQuestions.map(String).includes(String(qId))) {
            return;
        }

        try {
            const response = await api.post(`/api/questions/${qId}/upvote`);
            const updatedQuestion = response.data?.data;

            setQuestions(prev =>
                prev.map(q => q.id === qId ? { ...q, upvotes: updatedQuestion?.upvotes ?? q.upvotes } : q)
                    .sort((a, b) => b.upvotes - a.upvotes)
            );

            markAsVoted(qId);
            setVotedQuestions(prev => [...prev, String(qId)]);
        } catch (err) {
            console.error("Erreur lors du vote :", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-coffee-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-coffee-400">Récupération des détails...</p>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black px-4">
                <div className="text-center bg-black p-8 rounded-3xl border border-coffee-800 max-w-sm w-full">
                    <p className="text-red-500 font-semibold mb-6">{error || "Session introuvable"}</p>
                    <button onClick={handleClose} className="w-full py-3 bg-coffee-600 text-white rounded-xl font-bold hover:bg-coffee-700 transition">
                        Retour au planning
                    </button>
                </div>
            </div>
        );
    }

    const isLive = isLiveSession(session.startTime, session.endTime);

    return (
        <div className="min-h-screen bg-black pb-12 mt-16">
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex justify-end items-center mb-8">
                    <button
                        onClick={handleClose} 
                        className="p-2 text-coffee-400 hover:text-white hover:bg-coffee-900/50 rounded-xl transition border border-coffee-800"
                        aria-label="Fermer et retourner au planning"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="bg-black rounded-[2rem] border border-coffee-800 overflow-hidden">
                    <div className={`p-8 ${isLive ? 'bg-gradient-to-br from-red-950/50 to-orange-950/50' : 'bg-gradient-to-br from-coffee-950/50 to-coffee-900/30'}`}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {isLive && (
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 animate-pulse">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                    EN DIRECT
                                </span>
                            )}
                            <span className="bg-coffee-900/50 backdrop-blur-sm text-coffee-300 px-3 py-1 rounded-full text-xs font-bold border border-coffee-800">
                                {session.event?.title || 'Conférence'}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                            {session.title}
                        </h1>
                        <p className="text-coffee-300 text-lg leading-relaxed max-w-3xl">
                            {session.description}
                        </p>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <InfoTile icon={<Calendar />} label="Date" value={formatDate(session.startTime)} />
                            <InfoTile icon={<Clock />} label="Horaire" value={`${formatHour(session.startTime)} - ${formatHour(session.endTime)}`} />
                            <InfoTile icon={<MapPin />} label="Lieu / Salle" value={session.room?.name || 'À confirmer'} />
                            <InfoTile icon={<Users />} label="Capacité" value={`${session.capacity} places`} />
                        </div>

                        {session.speakers && session.speakers.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <User className="w-5 h-5 text-coffee-400" />
                                    Intervenants
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {session.speakers.map((speaker) => (
                                        <div key={speaker.id} className="flex items-center gap-4 p-4 rounded-2xl border border-coffee-800 bg-coffee-950/30">
                                            <div className="w-14 h-14 bg-coffee-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner">
                                                {speaker.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{speaker.fullName}</p>
                                                <p className="text-sm text-coffee-400 font-medium">{speaker.bio || 'Expert / Conférencier'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-10 border-t border-coffee-800">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-coffee-400" />
                                    Q&A Live
                                </h3>
                                <span className="bg-coffee-900 text-coffee-300 px-3 py-1 rounded-lg text-xs font-bold">
                                    {questions.length} question{questions.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            {isLive ? (
                                <form onSubmit={handleSendQuestion} className="mb-10 bg-coffee-950/50 rounded-2xl border border-coffee-800 p-2 focus-within:border-coffee-600 transition-colors">
                                    <textarea
                                        value={newQuestion}
                                        onChange={(e) => {
                                            setNewQuestion(e.target.value);
                                            if (sendError) setSendError(null);
                                        }}
                                        placeholder="Une question pour les intervenants ?"
                                        className="w-full p-4 text-white bg-transparent outline-none resize-none h-24 text-lg placeholder-coffee-500"
                                        required
                                    />
                                    {sendError && (
                                        <p className="px-4 pb-2 text-sm font-semibold text-red-400">
                                            {sendError}
                                        </p>
                                    )}
                                    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-coffee-900/30 rounded-xl">
                                        <input
                                            type="text"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            placeholder="Votre nom (optionnel)"
                                            className="w-full sm:flex-1 bg-transparent px-4 py-2 text-sm outline-none font-medium text-coffee-300 placeholder-coffee-600"
                                        />
                                        <button
                                            disabled={isSending}
                                            type="submit"
                                            className="w-full sm:w-auto bg-coffee-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-coffee-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isSending ? 'Envoi...' : 'Envoyer'}
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="mb-10 p-8 bg-coffee-950/30 rounded-3xl border border-dashed border-coffee-800 text-center">
                                    <Clock className="w-8 h-8 text-coffee-500 mx-auto mb-3" />
                                    <p className="text-coffee-400 font-bold">Le module de questions s'activera au début du direct.</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {questions.length > 0 ? (
                                    questions.map((q) => {
                                        const alreadyVoted = votedQuestions.map(String).includes(String(q.id));
                                        return (
                                            <div key={q.id} className="group p-6 bg-coffee-950/30 border border-coffee-800 rounded-2xl hover:border-coffee-700 hover:bg-coffee-900/30 transition-all flex items-start gap-4">
                                                <div className="flex-1">
                                                    <p className="text-white font-semibold text-lg mb-3 leading-snug">{q.content}</p>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-6 w-6 rounded-full bg-coffee-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                            {(q.authorName || 'A').charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-bold text-coffee-400">{q.authorName || 'Anonyme'}</span>
                                                        <span className="text-coffee-600 text-xs">•</span>
                                                        <span className="text-coffee-500 text-xs font-medium">
                                                            {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleUpvote(q.id)}
                                                    disabled={alreadyVoted}
                                                    aria-pressed={alreadyVoted}
                                                    title={alreadyVoted ? "Vous avez déjà voté pour cette question" : "Voter pour cette question"}
                                                    className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all border ${alreadyVoted
                                                        ? 'bg-coffee-900/50 border-coffee-700 text-coffee-400 cursor-not-allowed'
                                                        : 'bg-coffee-950/30 border-transparent text-coffee-600 hover:border-coffee-800'
                                                        }`}
                                                >
                                                    <ThumbsUp className={`w-5 h-5 ${alreadyVoted ? 'fill-coffee-400' : ''}`} />
                                                    <span className="text-xs font-black text-coffee-400">{q.upvotes}</span>
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-coffee-500 font-medium italic">Soyez le premier à poser une question !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-coffee-950/30 rounded-2xl border border-coffee-800">
            <div className="p-2.5 bg-coffee-900/50 text-coffee-400 rounded-xl border border-coffee-800">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-coffee-500 mb-0.5">{label}</p>
                <p className="text-white font-bold leading-none">{value}</p>
            </div>
        </div>
    );
}