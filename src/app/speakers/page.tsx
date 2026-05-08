import Link from "next/link";

export default async function SpeakersPage() {
  const API_URL = "http://localhost:3001/api";

  const res = await fetch(`${API_URL}/speakers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des speakers");
  }

  const json = await res.json();

  const speakers = json.data;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Tous les intervenants
        </h1>

        <p className="text-gray-500 mt-2">
          Découvrez les speakers présents durant l’événement.
        </p>
      </div>

      {speakers?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {speakers.map((speaker: any) => (
            <Link
              key={speaker.id}
              href={`/speakers/${speaker.id}`}
              className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition bg-white"
            >

              <div className="flex flex-col items-center text-center">

                {speaker.photoUrl ? (
                  <img
                    src={speaker.photoUrl}
                    alt={speaker.fullName}
                    className="w-28 h-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <h2 className="text-xl font-semibold mt-4">
                  {speaker.fullName}
                </h2>

                {speaker.bio && (
                  <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                    {speaker.bio}
                  </p>
                )}

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
          Aucun intervenant trouvé.
        </div>
      )}

    </div>
  );
}