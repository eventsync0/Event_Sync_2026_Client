import Link from "next/link";

export default async function SpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  const res = await fetch(`${API_URL}/speakers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error loading speakers");
  }

  const json = await res.json();
  const speakers = json.data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          All of speakers
        </h1>

        <p className="text-gray-500 mt-2">
          Discover the speakers present during the event.
        </p>
      </div>

      {/* LISTE DES SPEAKERS */}
      {speakers?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {speakers.map((speaker: any) => (
            <Link
              key={speaker.id}
              href={`/speakers/${speaker.id}`}
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

                {/* NOM */}
                <h2 className="text-xl font-semibold mt-4 text-black">
                  {speaker.fullName}
                </h2>

                {/* BIO */}
                {speaker.bio && (
                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {speaker.bio}
                  </p>
                )}

                {/* LINKS */}
                {speaker.links?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">

                    {speaker.links.map((link: any) => (
                      <span
                        key={link.id}
                        className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {link.platform}
                      </span>
                    ))}

                  </div>
                )}

              </div>

            </Link>
          ))}

        </div>
      ) : (
        <div className="text-gray-500">
          No speakers found.
        </div>
      )}

    </div>
  );
}