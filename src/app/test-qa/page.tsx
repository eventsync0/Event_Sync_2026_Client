'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Result {
  status: Status
  code?: number
  data?: unknown
  duration?: number
}

interface TestBlock {
  label: string
  description: string
  run: () => Promise<{ code: number; data: unknown }>
}

function useTest() {
  const [result, setResult] = useState<Result>({ status: 'idle' })

  async function run(fn: () => Promise<{ code: number; data: unknown }>) {
    setResult({ status: 'loading' })
    const start = Date.now()
    try {
      const { code, data } = await fn()
      setResult({
        status: code >= 200 && code < 300 ? 'success' : 'error',
        code,
        data,
        duration: Date.now() - start
      })
    } catch (e: unknown) {
      setResult({
        status: 'error',
        data: { error: e instanceof Error ? e.message : 'Erreur réseau' },
        duration: Date.now() - start
      })
    }
  }

  return { result, run }
}

function TestCard({
  label,
  description,
  block
}: {
  label: string
  description: string
  block: () => Promise<{ code: number; data: unknown }>
}) {
  const { result, run } = useTest()

  const borderColor = {
    idle:    'border-zinc-700',
    loading: 'border-yellow-500',
    success: 'border-emerald-500',
    error:   'border-red-500'
  }[result.status]

  const statusBadge = {
    idle: null,
    loading: (
      <span className="whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded bg-amber-950 text-yellow-400 shrink-0">
        ⟳ En cours...
      </span>
    ),
    success: (
      <span className="whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 shrink-0">
        ✓ {result.code} OK · {result.duration}ms
      </span>
    ),
    error: (
      <span className="whitespace-nowrap text-xs font-medium px-2.5 py-1 rounded bg-red-950 text-red-400 shrink-0">
        ✗ {result.code ?? 'ERR'} · {result.duration}ms
      </span>
    )
  }[result.status]

  return (
    <div className={`bg-zinc-900 border ${borderColor} rounded-xl px-5 py-4 transition-colors duration-200`}>
      <div className="flex justify-between items-start gap-3 mb-3">
        <div>
          <p className="text-sm font-semibold text-zinc-100 font-mono">{label}</p>
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        </div>
        {statusBadge}
      </div>

      <button
        onClick={() => run(block)}
        disabled={result.status === 'loading'}
        className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-600 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-mono text-xs px-3.5 py-1.5 rounded-md transition-all duration-150"
      >
        {result.status === 'loading' ? 'Exécution...' : 'Lancer le test'}
      </button>

      {result.data !== undefined && (
        <pre className="mt-4 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-all">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default function TestQAPage() {
  const [sessionId, setSessionId]   = useState('')
  const [questionId, setQuestionId] = useState('')
  const [content, setContent]       = useState('Est-ce que ce sujet sera disponible en replay ?')
  const [authorName, setAuthorName] = useState('Harena')

  const inputClass = "w-full bg-zinc-950 border border-zinc-700 focus:border-indigo-500 outline-none rounded-md px-3 py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 transition-colors"
  const labelClass = "block text-xs text-zinc-500 mb-1.5"

  const tests: TestBlock[] = [
    {
      label: 'GET /sessions/:id/questions',
      description: "Récupère toutes les questions d'une session, triées par upvotes",
      run: async () => {
        const res = await fetch(`${API}/sessions/${sessionId}/questions`)
        return { code: res.status, data: await res.json() }
      }
    },
    {
      label: 'POST /questions',
      description: 'Soumet une question (bloqué si session non live)',
      run: async () => {
        const res = await fetch(`${API}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, content, authorName: authorName || undefined })
        })
        return { code: res.status, data: await res.json() }
      }
    },
    {
      label: 'POST /questions — anonyme',
      description: 'Même test sans authorName → doit retourner "Anonyme"',
      run: async () => {
        const res = await fetch(`${API}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, content })
        })
        return { code: res.status, data: await res.json() }
      }
    },
    {
      label: 'POST /questions — contenu vide',
      description: 'Doit retourner 400 (validation backend)',
      run: async () => {
        const res = await fetch(`${API}/questions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, content: '' })
        })
        return { code: res.status, data: await res.json() }
      }
    },
    {
      label: 'POST /questions/:id/upvote',
      description: "Incrémente le compteur d'upvotes d'une question",
      run: async () => {
        const res = await fetch(`${API}/questions/${questionId}/upvote`, { method: 'POST' })
        return { code: res.status, data: await res.json() }
      }
    },
    {
      label: 'POST /questions/:id/upvote — ID invalide',
      description: 'Doit retourner 404 pour une question inexistante',
      run: async () => {
        const res = await fetch(`${API}/questions/id-qui-nexiste-pas/upvote`, { method: 'POST' })
        return { code: res.status, data: await res.json() }
      }
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-mono px-6 py-12">

      <div className="max-w-3xl mx-auto mb-10 pb-6 border-b border-zinc-800">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-50">
          Test · Module Questions & Upvotes
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          Vérifie que tous les endpoints de la partie Harena répondent correctement.
        </p>
        <span className="inline-block mt-3 bg-zinc-900 border border-zinc-700 rounded px-2.5 py-0.5 text-xs text-zinc-400 uppercase tracking-widest">
          HARENA · EventSync
        </span>
      </div>

      <div className="max-w-3xl mx-auto mb-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-4">Paramètres de test</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Session ID (UUID)</label>
            <input className={inputClass} value={sessionId} onChange={e => setSessionId(e.target.value)} placeholder="ex: clx1abc2def3..." />
          </div>
          <div>
            <label className={labelClass}>Question ID (pour upvote)</label>
            <input className={inputClass} value={questionId} onChange={e => setQuestionId(e.target.value)} placeholder="ex: clx4xyz9..." />
          </div>
          <div>
            <label className={labelClass}>Contenu de la question</label>
            <input className={inputClass} value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Nom auteur (vide = anonyme)</label>
            <input className={inputClass} value={authorName} onChange={e => setAuthorName(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {tests.map(t => (
          <TestCard key={t.label} label={t.label} description={t.description} block={t.run} />
        ))}
      </div>

    </div>
  )
}