"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function SpeakerPage() {
  const API_URL = "http://localhost:3001/api";
  const params = useParams();
  const id = params?.id as string;

  const [speaker, setSpeaker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showSessions, setShowSessions] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSpeaker = async () => {
      try {
        const res = await fetch(`${API_URL}/speakers/${id}`);

        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          console.error("Fetch failed:", res.status, await res.text());
          setNotFound(true);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setSpeaker(json.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [id]);

  const getPlatformIcon = (platform: string) => {
    const p = platform?.toLowerCase();
    if (p === "linkedin") return <FaLinkedin className="w-5 h-5" />;
    if (p === "github") return <FaGithub className="w-5 h-5" />;
    return <FaGlobe className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-txt-secondary animate-pulse">
        Loading speaker...
      </div>
    );
  }

  if (notFound || !speaker) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-4">🎙️</p>
        <h2 className="text-2xl font-bold text-txt-title mb-2">Speaker not found</h2>
        <p className="text-txt-secondary mb-6">
          This speaker doesn't exist or may have been removed.
        </p>
        <Link
          href="/speakers"
          className="inline-block px-6 py-3 rounded-xl border border-coffee-200/50 text-txt-title hover:bg-coffee-200/10 transition-colors text-sm font-semibold"
        >
          ← Back to speakers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* BACK LINK */}
      <Link
        href="/speakers"
        className="inline-flex items-center gap-1.5 text-sm text-txt-secondary hover:text-txt-title transition-colors"
      >
        ← Back to speakers
      </Link>

      {/* SPEAKER HERO CARD */}
      <div className="mt-8 bg-bg-card border border-coffee-200/40 rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row gap-8">

          {/* PHOTO */}
          <div className="flex-shrink-0">
            {speaker.photoUrl ? (
              <img
                src={speaker.photoUrl}
                alt={speaker.fullName}
                className="w-36 h-36 rounded-2xl object-cover ring-2 ring-coffee-200/30"
              />
            ) : (
              <div className="w-36 h-36 rounded-2xl bg-coffee-200/10 border border-coffee-200/20 flex items-center justify-center text-txt-secondary text-sm">
                No photo
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h1 className="font-audiowide text-3xl md:text-4xl text-txt-title leading-tight">
              {speaker.fullName}
            </h1>

            {speaker.bio && (
              <p className="text-txt-secondary mt-4 leading-relaxed max-w-prose">
                {speaker.bio}
              </p>
            )}

            {/* SOCIAL LINKS */}
            {speaker.links?.length > 0 && (
              <div className="flex gap-4 mt-6">
                {speaker.links.map((link: any) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-txt-secondary hover:text-txt-title transition-colors"
                    title={link.platform}
                  >
                    {getPlatformIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* SESSIONS TOGGLE */}
      <div className="mt-10">
        <button
          onClick={() => setShowSessions((prev) => !prev)}
          className="flex items-center gap-3 w-full text-left group"
        >
          <h2 className="font-audiowide text-xl text-txt-title group-hover:opacity-80 transition-opacity">
            Sessions
          </h2>
          {speaker.sessions?.length > 0 && (
            <span className="text-xs text-txt-secondary border border-coffee-200/30 rounded-full px-2.5 py-0.5">
              {speaker.sessions.length}
            </span>
          )}
          <span
            className="ml-auto text-txt-secondary text-lg transition-transform duration-200"
            style={{ transform: showSessions ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </button>

        {showSessions && (
          <div className="mt-6">
            {speaker.sessions?.length > 0 ? (
              <div className="space-y-4">
                {speaker.sessions.map((session: any) => (
                  <div
                    key={session.id}
                    className="bg-bg-card border border-coffee-200/30 rounded-2xl p-5 hover:border-coffee-200/60 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/sessions/${session.id}`}
                          className="text-lg font-semibold text-txt-title hover:text-coffee-200 transition-colors line-clamp-2"
                        >
                          {session.title}
                        </Link>

                        {(session.startTime || session.endTime) && (
                          <p className="text-sm text-txt-secondary mt-1.5">
                            🕐 {session.startTime}
                            {session.endTime && ` — ${session.endTime}`}
                          </p>
                        )}

                        {session.description && (
                          <p className="text-sm text-txt-secondary mt-2 line-clamp-2">
                            {session.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                        {session.event && (
                          <Link
                            href={`/events/${session.event.id}`}
                            className="text-xs text-txt-secondary border border-coffee-200/30 rounded-full px-3 py-1 hover:border-coffee-200/60 hover:text-txt-title transition-all"
                          >
                            📅 {session.event.name ?? "Event"}
                          </Link>
                        )}

                        <Link
                          href={`/sessions/${session.id}`}
                          className="text-xs font-semibold text-txt-title border border-coffee-200/50 rounded-full px-3 py-1 hover:bg-coffee-200/10 transition-colors"
                        >
                          View session →
                        </Link>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-txt-secondary border border-coffee-200/20 rounded-2xl">
                <p className="text-2xl mb-2">📭</p>
                <p>No sessions scheduled yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}