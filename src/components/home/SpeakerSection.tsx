"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function SpeakersSection() {
  const API_URL = "http://localhost:3001/api";

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${API_URL}/speakers`);
        if (!res.ok) {
          console.error("Fetch failed:", res.status);
          return;
        }
        const json = await res.json();
        setSpeakers(json.data);
      } catch (err) {
        console.error("Error fetching speakers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) =>
      speaker.fullName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [speakers, search]);

  const getPlatformIcon = (platform: string) => {
    const p = platform?.toLowerCase();
    if (p === "linkedin") return <FaLinkedin />;
    if (p === "github") return <FaGithub />;
    return <FaGlobe />;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="mb-12 text-center">
        <h1 className="font-audiowide text-4xl md:text-5xl text-txt-title">
          All Speakers
        </h1>
        <p className="text-txt-secondary mt-3 max-w-2xl mx-auto text-lg">
          Discover the experts, innovators, and leaders sharing knowledge during the event.
        </p>
      </div>

      

      {/* LOADING */}
      {loading && (
        <div className="text-center py-16 text-txt-secondary animate-pulse">
          Loading speakers...
        </div>
      )}

      {/* SPEAKER SCROLL */}
      {!loading && filteredSpeakers.length > 0 && (
        <div className="relative group">

          {/* LEFT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("speakers-scroll")
                ?.scrollBy({ left: -340, behavior: "smooth" })
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-bg-card border border-coffee-200 text-txt-title text-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-3"
          >
            ‹
          </button>

          {/* SCROLL AREA */}
          <div
            id="speakers-scroll"
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredSpeakers.map((speaker: any) => {
              // Pick the first session to show as a teaser link on the card
              const firstSession = speaker.sessions?.[0];

              return (
                <div
                  key={speaker.id}
                  className="flex-shrink-0 w-64 bg-bg-card border border-coffee-200/40 rounded-3xl p-6 text-center flex flex-col hover:border-coffee-200 hover:shadow-lg transition-all duration-200"
                >

                  {/* PHOTO */}
                  <div className="flex justify-center mb-4">
                    {speaker.photoUrl ? (
                      <img
                        src={speaker.photoUrl}
                        alt={speaker.fullName}
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-coffee-200/30"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-coffee-200/10 border border-coffee-200/20 flex items-center justify-center text-txt-secondary text-sm">
                        No photo
                      </div>
                    )}
                  </div>

                  {/* NAME */}
                  <h2 className="text-base font-bold text-txt-title leading-snug">
                    {speaker.fullName}
                  </h2>

                  {/* BIO — clamped to 2 lines */}
                  {speaker.bio && (
                    <p className="text-xs text-txt-secondary mt-2 line-clamp-2 leading-relaxed">
                      {speaker.bio}
                    </p>
                  )}

                  {/* SESSION TEASER */}
                  {firstSession && (
                    <Link
                      href={`/sessions/${firstSession.id}`}
                      className="mt-3 text-xs text-coffee-200 hover:underline truncate block"
                      title={firstSession.title}
                    >
                      🎤 {firstSession.title}
                    </Link>
                  )}

                  {/* PUSH LINKS + CTA to bottom */}
                  <div className="flex-1" />

                  {/* SOCIAL LINKS */}
                  {speaker.links?.length > 0 && (
                    <div className="flex gap-3 mt-5 justify-center text-txt-secondary">
                      {speaker.links.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-txt-title transition-colors text-base"
                        >
                          {getPlatformIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* VIEW PROFILE CTA */}
                  <Link
                    href={`/speakers/${speaker.id}`}
                    className="mt-5 inline-block w-full py-2.5 rounded-xl border border-coffee-200/50 text-sm font-semibold text-txt-title hover:bg-coffee-200/10 transition-colors"
                  >
                    View profile →
                  </Link>

                </div>
              );
            })}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("speakers-scroll")
                ?.scrollBy({ left: 340, behavior: "smooth" })
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-bg-card border border-coffee-200 text-txt-title text-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-x-3"
          >
            ›
          </button>

        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredSpeakers.length === 0 && (
        <div className="text-center py-20 text-txt-secondary">
          <p className="text-3xl mb-3">🎙️</p>
          <p className="text-lg font-medium">No speakers found.</p>
          {search && (
            <p className="text-sm mt-1">
              Try a different name or{" "}
              <button
                onClick={() => setSearch("")}
                className="underline hover:text-txt-title transition-colors"
              >
                clear the search
              </button>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}