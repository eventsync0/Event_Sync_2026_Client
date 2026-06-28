"use client";

import { useEffect, useState, useMemo } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function SpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-21">

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
        <div className="text-center py-16 text-txt-secondary">
          Loading speakers...
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-10 flex justify-center">
        <div className="w-full max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a speaker..."
            className="
              w-full px-5 py-4 rounded-2xl border
              border-coffee-200 bg-black text-black
              placeholder:text-txt-secondary shadow-sm
              focus:outline-none focus:ring-2
              focus:ring-coffee-400 focus:border-coffee-400
              transition-all
            "
          />
        </div>
      </div>

      {/* LIST */}
      {!loading && filteredSpeakers.length > 0 ? (
        <div className="relative group">

          {/* LEFT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("speakers-scroll")
                ?.scrollBy({ left: -320, behavior: "smooth" })
            }
            className="
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5
              z-10 w-10 h-10 rounded-full bg-bg-card
              border border-coffee-200 text-coffee-600
              shadow-md flex items-center justify-center
              hover:bg-coffee-100 hover:scale-110
              transition-all opacity-0 group-hover:opacity-100
            "
          >
            ‹
          </button>

          {/* SCROLL AREA */}
          <div
            id="speakers-scroll"
            className="
              flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1
              snap-x snap-mandatory
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
            "
          >
            {filteredSpeakers.map((speaker: any) => (
              <div
                key={speaker.id}
                className="
                  snap-start shrink-0 w-64 bg-bg-card
                  border border-coffee-200 rounded-3xl p-6
                  text-center shadow-sm
                  hover:shadow-xl hover:-translate-y-2
                  hover:border-coffee-400
                  transition-all duration-300
                "
              >

                {/* IMAGE */}
                <div className="flex justify-center">
                  {speaker.photoUrl ? (
                    <img
                      src={speaker.photoUrl}
                      alt={speaker.fullName}
                      className="
                        w-28 h-28 rounded-full object-cover
                        border-4 border-coffee-100 shadow-md
                      "
                    />
                  ) : (
                    <div className="
                      w-28 h-28 rounded-full bg-coffee-100
                      flex items-center justify-center
                      text-coffee-600 font-medium
                    ">
                      No Image
                    </div>
                  )}
                </div>

                {/* NAME */}
                <h2 className="text-xl md:text-2xl font-bold mt-5 text-txt-title">
                  {speaker.fullName}
                </h2>

                {/* BIO */}
                {speaker.bio && (
                  <p className="text-sm text-txt-secondary mt-3 line-clamp-3 leading-relaxed">
                    {speaker.bio}
                  </p>
                )}

                {/* LINKS */}
                {speaker.links?.length > 0 && (
                  <div className="flex gap-3 mt-5 justify-center">
                    {speaker.links.map((link: any) => {
                      const platform = link.platform?.toLowerCase();

                      let icon = <FaGlobe className="text-lg" />;
                      if (platform === "linkedin") icon = <FaLinkedin className="text-lg" />;
                      else if (platform === "github") icon = <FaGithub className="text-lg" />;

                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            p-3 rounded-full bg-coffee-100
                            text-coffee-700 hover:bg-coffee-200
                            hover:scale-110 transition-all duration-300
                          "
                        >
                          {icon}
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* BUTTON */}
                <button
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="mt-6 text-sm font-semibold text-coffee-600 hover:text-coffee-700 transition"
                >
                  View profile →
                </button>

              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("speakers-scroll")
                ?.scrollBy({ left: 320, behavior: "smooth" })
            }
            className="
              absolute right-0 top-1/2 -translate-y-1/2 translate-x-5
              z-10 w-10 h-10 rounded-full bg-bg-card
              border border-coffee-200 text-coffee-600
              shadow-md flex items-center justify-center
              hover:bg-coffee-100 hover:scale-110
              transition-all opacity-0 group-hover:opacity-100
            "
          >
            ›
          </button>

        </div>
      ) : (
        !loading && (
          <div className="text-center py-16 text-txt-secondary">
            No speakers available.
          </div>
        )
      )}

      {/* MODAL */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="
            bg-bg-card w-[90%] max-w-3xl rounded-3xl
            p-8 shadow-2xl border border-coffee-200 relative
          ">

            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-3 right-4 text-txt-secondary hover:text-black text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

              {/* IMAGE */}
              {selectedSpeaker.photoUrl ? (
                <img
                  src={selectedSpeaker.photoUrl}
                  alt={selectedSpeaker.fullName}
                  className="w-40 h-40 rounded-full object-cover border-4 border-coffee-100 shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-600">
                  No Image
                </div>
              )}

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">

                <h2 className="font-audiowide text-3xl md:text-4xl text-txt-title">
                  {selectedSpeaker.fullName}
                </h2>

                {selectedSpeaker.bio && (
                  <p className="text-txt-secondary mt-5 leading-relaxed">
                    {selectedSpeaker.bio}
                  </p>
                )}

                {selectedSpeaker.links?.length > 0 && (
                  <div className="flex gap-3 mt-6 justify-center md:justify-start">
                    {selectedSpeaker.links.map((link: any) => {
                      const platform = link.platform?.toLowerCase();

                      let icon = <FaGlobe className="text-lg" />;
                      if (platform === "linkedin") icon = <FaLinkedin className="text-lg" />;
                      else if (platform === "github") icon = <FaGithub className="text-lg" />;

                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            p-3 rounded-full bg-coffee-100
                            text-coffee-700 hover:bg-coffee-200
                            hover:scale-110 transition-all duration-300
                          "
                        >
                          {icon}
                        </a>
                      );
                    })}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}