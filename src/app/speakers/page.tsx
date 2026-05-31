"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function SpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);

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
    <div className="max-w-6xl mx-auto px-6 py-12">

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

      {/* GRID */}
      {!loading && speakers?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {speakers.map((speaker: any) => (
            <div
              key={speaker.id}
              className="
                bg-bg-card
                border
                border-coffee-200
                rounded-3xl
                p-6
                text-center
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                hover:border-coffee-400
                transition-all
                duration-300
              "
            >

              {/* PHOTO */}
              <div className="flex justify-center">
                {speaker.photoUrl ? (
                  <img
                    src={speaker.photoUrl}
                    alt={speaker.fullName}
                    className="
                      w-28 h-28
                      rounded-full
                      object-cover
                      border-4 border-coffee-100
                      shadow-md
                    "
                  />
                ) : (
                  <div className="
                    w-28 h-28
                    rounded-full
                    bg-coffee-100
                    flex items-center justify-center
                    text-coffee-600
                    font-medium
                  ">
                    No Image
                  </div>
                )}
              </div>

              {/* NAME */}
              <h2 className="
                text-xl md:text-2xl
                font-bold
                mt-5
                text-txt-title
              ">
                {speaker.fullName}
              </h2>

              {/* BIO */}
              {speaker.bio && (
                <p className="
                  text-sm
                  text-txt-secondary
                  mt-3
                  line-clamp-3
                  leading-relaxed
                ">
                  {speaker.bio}
                </p>
              )}

              {/* SOCIAL LINKS */}
              {speaker.links?.length > 0 && (
                <div className="flex gap-3 mt-5 justify-center">

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
                        className="
                          p-3
                          rounded-full
                          bg-coffee-100
                          text-coffee-700
                          hover:bg-coffee-200
                          hover:scale-110
                          transition-all
                          duration-300
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
                className="
                  mt-6
                  text-sm
                  font-semibold
                  text-coffee-600
                  hover:text-coffee-700
                  transition
                "
              >
                View profile →
              </button>

            </div>
          ))}

        </div>
      ) : (
        !loading && (
          <div className="
            text-center
            py-16
            text-txt-secondary
          ">
            No speakers available.
          </div>
        )
      )}

      {/* ================= MODAL ================= */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="
            bg-bg-card
            w-[90%]
            max-w-3xl
            rounded-3xl
            p-8
            shadow-2xl
            border
            border-coffee-200
            relative
          ">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="
                absolute
                top-3
                right-4
                text-txt-secondary
                hover:text-black
                text-xl
              "
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
                  className="
                    w-40 h-40
                    rounded-full
                    object-cover
                    border-4 border-coffee-100
                    shadow-lg
                  "
                />
              ) : (
                <div className="
                  w-40 h-40
                  rounded-full
                  bg-coffee-100
                  flex items-center justify-center
                  text-coffee-600
                ">
                  No Image
                </div>
              )}

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">

                <h2 className="
                  font-audiowide
                  text-3xl md:text-4xl
                  text-txt-title
                ">
                  {selectedSpeaker.fullName}
                </h2>

                {selectedSpeaker.bio && (
                  <p className="
                    text-txt-secondary
                    mt-5
                    leading-relaxed
                  ">
                    {selectedSpeaker.bio}
                  </p>
                )}

                {/* SOCIAL */}
                {selectedSpeaker.links?.length > 0 && (
                  <div className="flex gap-3 mt-6 justify-center md:justify-start">

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
                          className="
                            p-3
                            rounded-full
                            bg-coffee-100
                            text-coffee-700
                            hover:bg-coffee-200
                            hover:scale-110
                            transition-all
                            duration-300
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