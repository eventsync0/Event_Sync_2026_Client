'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, Clock, MapPin, Users, User, ArrowLeft, 
  Link as LinkIcon, Tag, Star, Send, ThumbsUp, MessageSquare 
} from 'lucide-react';
import { formatHour, formatDate, isLiveSession } from '@/lib/utils';
import api from '@/lib/api';
import { Session } from '@/types';
import { getFavoriteIds, toggleFavorite } from '@/lib/favoritesService';

export default function SessionDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isFav, setIsFav] = useState(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isSending, setIsSending] = useState(false);

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
        if (!newQuestion.trim() || isSending) return;

        setIsSending(true);
        try {
            const res = await api.post('/api/questions', {
                sessionId: id,
                content: newQuestion,
                authorName: authorName.trim() || "Anonyme"
            });
            
            setQuestions(prev => [res.data, ...prev]);
            setNewQuestion('');
            setAuthorName('');
        } catch (err) {
            alert("Erreur lors de l'envoi. Assurez-vous que la session est bien en cours.");
        } finally {
            setIsSending(false);
        }
    };

    const handleUpvote = async (qId: string) => {
        try {
            await api.post(`/api/questions/${qId}/upvote`);
            setQuestions(prev => 
                prev.map(q => q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q)
                    .sort((a, b) => b.upvotes - a.upvotes)
            );
        } catch (err) {
            console.error("Erreur lors de l'upvote");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-coffee-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Récupération des détails...</p>
                </div>
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white p-8 rounded-3xl shadow-sm border max-w-sm w-full">
                    <p className="text-red-500 font-semibold mb-6">{error || "Session introuvable"}</p>
                    <button onClick={() => router.back()} className="w-full py-3 bg-coffee-600 text-white rounded-xl font-bold">
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    const isLive = isLiveSession(session.startTime, session.endTime);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white rounded-xl border hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Planning
                    </button>

                    <button
                        onClick={handleToggleFav}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold text-sm transition-all shadow-sm ${
                            isFav ? 'bg-yellow-400 border-yellow-400 text-white' : 'bg-white border-gray-200 text-gray-700'
                        }`}
                    >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                        {isFav ? 'Programmé' : 'Ajouter au planning'}
                    </button>
                </div>

                {/* Card Principale */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    {/* Hero Section de la Session */}
                    <div className={`p-8 ${isLive ? 'bg-gradient-to-br from-red-50 to-orange-50' : 'bg-gradient-to-br from-coffee-50 to-indigo-50'}`}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {isLive && (
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 animate-pulse">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                    EN DIRECT
                                </span>
                            )}
                            <span className="bg-white/80 backdrop-blur-sm text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-100">
                                {session.event?.title || 'Conférence'}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                            {session.title}
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
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
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <User className="w-5 h-5 text-coffee-600" />
                                    Intervenants
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {session.speakers.map((speaker) => (
                                        <div key={speaker.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                                            <div className="w-14 h-14 bg-coffee-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner">
                                                {speaker.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{speaker.fullName}</p>
                                                <p className="text-sm text-gray-500 font-medium">{speaker.bio || 'Expert / Conférencier'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-10 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-coffee-600" />
                                    Q&A Live
                                </h3>
                                <span className="bg-coffee-100 text-coffee-700 px-3 py-1 rounded-lg text-xs font-bold">
                                    {questions.length} question{questions.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            {isLive ? (
                                <form onSubmit={handleSendQuestion} className="mb-10 bg-white rounded-2xl border-2 border-coffee-100 p-2 shadow-sm focus-within:border-coffee-400 transition-colors">
                                    <textarea
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        placeholder="Une question pour les intervenants ?"
                                        className="w-full p-4 text-gray-800 outline-none resize-none h-24 text-lg"
                                        required
                                    />
                                    <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-gray-50 rounded-xl">
                                        <input
                                            type="text"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            placeholder="Votre nom (optionnel)"
                                            className="w-full sm:flex-1 bg-transparent px-4 py-2 text-sm outline-none font-medium"
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
                                <div className="mb-10 p-8 bg-gray-100 rounded-3xl border border-dashed border-gray-300 text-center">
                                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500 font-bold">Le module de questions s'activera au début du direct.</p>
                                </div>
                            )}
                            <div className="space-y-4">
                                {questions.length > 0 ? (
                                    questions.map((q) => (
                                        <div key={q.id} className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-coffee-200 hover:shadow-md transition-all flex items-start gap-4">
                                            <div className="flex-1">
                                                <p className="text-gray-800 font-semibold text-lg mb-3 leading-snug">{q.content}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
                                                        {(q.authorName || 'A').charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-bold text-coffee-600">{q.authorName || 'Anonyme'}</span>
                                                    <span className="text-gray-300 text-xs">•</span>
                                                    <span className="text-gray-400 text-xs font-medium">
                                                        {new Date(q.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleUpvote(q.id)}
                                                className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all border ${
                                                    q.upvotes > 0 ? 'bg-coffee-50 border-coffee-100 text-coffee-600' : 'bg-gray-50 border-transparent text-gray-400 group-hover:border-gray-200'
                                                }`}
                                            >
                                                <ThumbsUp className={`w-5 h-5 ${q.upvotes > 0 ? 'fill-coffee-600' : ''}`} />
                                                <span className="text-xs font-black">{q.upvotes}</span>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-400 font-medium italic">Soyez le premier à poser une question !</p>
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
        <div className="flex items-center gap-4 p-4 bg-gray-50/80 rounded-2xl border border-gray-100/50">
            <div className="p-2.5 bg-white text-coffee-600 rounded-xl shadow-sm border border-gray-100">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
                <p className="text-gray-900 font-bold leading-none">{value}</p>
            </div>
        </div>
    );
}