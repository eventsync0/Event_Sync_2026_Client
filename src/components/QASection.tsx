'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  content: string
  authorName: string
  upvotes: number
  createdAt: string
}

interface Props {
  sessionId: string
  isLive: boolean
}

export function QASection({ sessionId, isLive }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLive) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}/questions`)
      .then(r => r.json())
      .then(d => setQuestions(d.data))
      .catch(console.error)
  }, [sessionId, isLive])

  if (!isLive) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400 italic">
          Les questions seront disponibles lors de la session
        </p>
      </div>
    )
  }

  async function handleSubmit() {
    if (!content.trim()) {
      setSubmitError('Veuillez écrire votre question')
      return
    }
    setSubmitError('')
    setIsSubmitting(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        content: content.trim(),
        authorName: authorName.trim() || undefined
      })
    })

    const data = await res.json()

    if (res.ok) {
      setContent('')
      setAuthorName('')
      setQuestions(prev => [data.data, ...prev])
    } else {
      setSubmitError(data.error)
    }

    setIsSubmitting(false)
  }

  async function handleUpvote(questionId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/questions/${questionId}/upvote`,
      { method: 'POST' }
    )
    if (res.ok) {
      const { data } = await res.json()
      setQuestions(prev =>
        [...prev.map(q => (q.id === questionId ? data : q))].sort(
          (a, b) =>
            b.upvotes - a.upvotes ||
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      )
    }
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Questions & Réponses</h2>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">Poser une question</h3>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Écrivez votre question..."
          className="w-full border rounded-lg p-3 resize-none text-sm"
          rows={3}
        />
        {submitError && (
          <p className="text-red-500 text-xs mt-1">{submitError}</p>
        )}
        <input
          value={authorName}
          onChange={e => setAuthorName(e.target.value)}
          placeholder="Votre nom (laisser vide pour rester anonyme)"
          className="w-full border rounded-lg px-3 py-2 text-sm mt-2"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer la question'}
        </button>
      </div>

      <div className="space-y-3">
        {questions.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">
            Aucune question pour le moment. Soyez le premier !
          </p>
        )}
        {questions.map(q => (
          <div key={q.id} className="flex items-start gap-4 border rounded-lg p-3">
            <div className="flex-1">
              <p className="text-sm">{q.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {q.authorName} · {new Date(q.createdAt).toLocaleTimeString('fr-FR')}
              </p>
            </div>
            <button
              onClick={() => handleUpvote(q.id)}
              className="flex flex-col items-center text-blue-600 hover:text-blue-800 shrink-0"
            >
              <span className="text-lg leading-none">▲</span>
              <span className="text-sm font-bold">{q.upvotes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}