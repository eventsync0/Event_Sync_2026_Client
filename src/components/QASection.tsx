'use client';
import { useState } from 'react';

export function QASection({ sessionId, isLive, initialQuestions }: any) {
    const [questions, setQuestions] = useState(initialQuestions || []);
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, content, authorName: authorName || null })
        });

        if (res.ok) {
            const newQ = await res.json();
            setQuestions([newQ, ...questions]);
            setContent('');
            setAuthorName('');
        }
    };

    const handleUpvote = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}/upvote`, { method: 'POST' });
        if (res.ok) {
            const { data } = await res.json();
            setQuestions(questions.map((q: any) => q.id === id ? data : q).sort((a: any, b: any) => b.upvotes - a.upvotes));
        }
    };

    if (!isLive) return (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center border border-dashed">
            <p className="text-gray-500">La session de questions/réponses s'ouvrira quand la session sera en direct.</p>
        </div>
    );

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Questions & Réponses</h2>
            
            <form onSubmit={handleSubmit} className="mb-8 space-y-3 bg-white p-4 rounded-xl border shadow-sm">
                <textarea 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Posez votre question..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="flex gap-2">
                    <input 
                        className="flex-1 p-2 border rounded-lg"
                        placeholder="Votre nom (optionnel)"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                        Envoyer
                    </button>
                </div>
            </form>

            <div className="space-y-4">
                {questions.map((q: any) => (
                    <div key={q.id} className="flex justify-between items-start p-4 bg-white border rounded-xl shadow-sm">
                        <div>
                            <p className="font-medium text-gray-800">{q.content}</p>
                            <p className="text-xs text-gray-400 mt-1">{q.authorName} • {new Date(q.createdAt).toLocaleTimeString()}</p>
                        </div>
                        <button 
                            onClick={() => handleUpvote(q.id)}
                            className="flex flex-col items-center px-3 py-1 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100"
                        >
                            <span className="text-lg">▲</span>
                            <span className="font-bold">{q.upvotes}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}