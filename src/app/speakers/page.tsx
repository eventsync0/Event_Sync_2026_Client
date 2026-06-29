"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import api from "@/lib/api";

export default function SpeakersPage() {
  const ITEMS_PER_PAGE = 6;

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);

  // FETCH
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const { data } = await api.get("/api/speakers");
        setSpeakers(data.data);
      } catch (error) {
        console.error("Error fetching speakers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  // FILTER
  const filteredSpeakers = useMemo(() => {
    return speakers.filter((s) =>
      s.fullName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [speakers, search]);

  // RESET PAGE
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION
  const totalPages = Math.ceil(filteredSpeakers.length / ITEMS_PER_PAGE);

  const paginatedSpeakers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSpeakers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSpeakers, currentPage]);

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const getPlatformIcon = (platform: string) => {
    const p = platform?.toLowerCase();
    if (p === "linkedin") return <FaLinkedin />;
    if (p === "github") return <FaGithub />;
    return <FaGlobe />;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="font-audiowide text-4xl md:text-5xl text-txt-title">
          All Speakers
        </h1>
        <p className="text-txt-secondary mt-3 max-w-2xl mx-auto text-lg">
          Discover experts and innovators sharing knowledge.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search a speaker..."
          className="w-full max-w-xl px-5 py-4 rounded-2xl border border-coffee-200 bg-bg-card text-txt-title placeholder:text-txt-secondary focus:ring-2 focus:ring-coffee-200 outline-none"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-16 text-txt-secondary animate-pulse">
          Loading speakers...
        </div>
      )}

      {/* GRID */}
      {!loading && paginatedSpeakers.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {paginatedSpeakers.map((speaker: any) => (
              <div
                key={speaker.id}
                className="bg-bg-card border border-coffee-200 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition"
              >

                {/* PHOTO */}
                <div className="flex justify-center">
                  {speaker.photoUrl ? (
                    <img
                      src={speaker.photoUrl}
                      className="w-28 h-28 rounded-full object-cover border-4 border-coffee-100"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-coffee-100 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                {/* NAME */}
                <h2 className="text-xl font-bold mt-5 text-txt-title">
                  {speaker.fullName}
                </h2>

                {/* BIO */}
                {speaker.bio && (
                  <p className="text-sm text-txt-secondary mt-3 line-clamp-3">
                    {speaker.bio}
                  </p>
                )}

                {/* LINKS */}
                <div className="flex gap-3 mt-5 justify-center">
                  {speaker.links?.map((l: any) => (
                    <a
                      key={l.id}
                      href={l.url}
                      target="_blank"
                      className="text-txt-secondary hover:text-txt-title transition"
                    >
                      {getPlatformIcon(l.platform)}
                    </a>
                  ))}
                </div>

                {/* VIEW */}
                <button
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="mt-5 text-coffee-600 font-semibold"
                >
                  View profile →
                </button>

              </div>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-12">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 border rounded-xl disabled:opacity-40"
            >
              Back
            </button>

            <span className="text-txt-secondary">
              Page {currentPage} / {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 border rounded-xl disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </>
      )}

      {/* EMPTY */}
      {!loading && filteredSpeakers.length === 0 && (
        <div className="text-center py-20 text-txt-secondary">
          No speakers found
        </div>
      )}

      {/* MODAL */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-bg-card p-8 rounded-3xl max-w-2xl w-[90%] relative">

            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-3 right-4"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">
              {selectedSpeaker.fullName}
            </h2>

            <p className="mt-4 text-txt-secondary">
              {selectedSpeaker.bio}
            </p>

          </div>

        </div>
      )}
    </div>
  );
}