"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function SpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);

  // FETCH DATA (client-side)
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-black">
          All Speakers
        </h1>
        <p className="text-gray-500 mt-2">
          Discover the speakers present during the event.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-gray-500">
          Loading speakers...
        </div>
      )}

      {/* GRID */}
      {!loading && speakers?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {speakers.map((speaker: any) => (
            <div
              key={speaker.id}
              className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex flex-col items-center text-center">

                {/* PHOTO */}
                {speaker.photoUrl ? (
                  <img
                    src={speaker.photoUrl}
                    alt={speaker.fullName}
                    className="w-28 h-28 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* NAME */}
                <h2 className="text-xl font-semibold mt-4 text-black">
                  {speaker.fullName}
                </h2>

                {/* BIO */}
                {speaker.bio && (
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {speaker.bio}
                  </p>
                )}

                {/* SOCIAL LINKS */}
                {speaker.links?.length > 0 && (
                  <div className="flex gap-3 mt-4 justify-center">

                    {speaker.links.map((link: any) => {
                      const platform = link.platform?.toLowerCase();

                      let icon = <FaGlobe className="text-lg" />;

                      if (platform === "linkedin") {
                        icon = <FaLinkedin className="text-lg" />;
                      } else if (platform === "github") {
                        icon = <FaGithub className="text-lg" />;
                      }

                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition flex items-center justify-center"
                        >
                          {icon}
                        </a>
                      );
                    })}

                  </div>
                )}

                {/* BUTTON OPEN MODAL */}
                <button
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="mt-5 text-sm font-medium text-blue-600 hover:underline"
                >
                  View profile →
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        !loading && (
          <div className="text-gray-500">
            No speakers found.
          </div>
        )
      )}

      {/* ================= MODAL ================= */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-3xl rounded-2xl p-6 relative shadow-xl">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

              {/* IMAGE */}
              {selectedSpeaker.photoUrl ? (
                <img
                  src={selectedSpeaker.photoUrl}
                  alt={selectedSpeaker.fullName}
                  className="w-40 h-40 rounded-full object-cover border"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">

                <h2 className="text-3xl font-bold text-black">
                  {selectedSpeaker.fullName}
                </h2>

                {selectedSpeaker.bio && (
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {selectedSpeaker.bio}
                  </p>
                )}

                {/* SOCIAL */}
                {selectedSpeaker.links?.length > 0 && (
                  <div className="flex gap-3 mt-5 justify-center md:justify-start">

                    {selectedSpeaker.links.map((link: any) => {
                      const platform = link.platform?.toLowerCase();

                      let icon = <FaGlobe className="text-lg" />;

                      if (platform === "linkedin") {
                        icon = <FaLinkedin className="text-lg" />;
                      } else if (platform === "github") {
                        icon = <FaGithub className="text-lg" />;
                      }

                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition flex items-center justify-center"
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