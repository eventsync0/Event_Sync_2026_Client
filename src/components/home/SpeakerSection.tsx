import Link from "next/link";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const getPlatformIcon = (platform: string) => {
  const p = platform?.toLowerCase();
  if (p === "linkedin") return <FaLinkedin />;
  if (p === "github") return <FaGithub />;
  return <FaGlobe />;
};

export default async function SpeakersSection() {
  let speakers: any[] = [];

  try {
    const res = await fetch(`${API_URL}/api/speakers`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      speakers = json.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching speakers:", err);
  }

  if (speakers.length === 0) {
    return (
      <div className="text-center py-20 text-txt-secondary">
        <p className="text-3xl mb-3">🎙️</p>
        <p className="text-lg font-medium">No speakers available.</p>
      </div>
    );
  }

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

      {/* SPEAKER GRID */}
      <div className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {speakers.map((speaker: any) => {
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

              {/* BIO */}
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

    </div>
  );
}