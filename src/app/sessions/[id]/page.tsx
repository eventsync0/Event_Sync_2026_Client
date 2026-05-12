import Link from "next/link";
import { notFound } from "next/navigation";
// import LiveBadge from "@/components/LiveBadge";        // composant badge LIVE
// import FavoriteButton from "@/components/FavoriteButton"; // composant de Harena
import { formatTime } from "@/lib/formatTime";         // utilitaire de formatage horaire

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const API_URL = "http://localhost:3001/api";

  const res = await fetch(`${API_URL}/sessions/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const json = await res.json();
  const session = json.data;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* En-tête : titre + badge LIVE */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-black">{session.title}</h1>
        {session.isLive && <LiveBadge />}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-lg leading-relaxed mb-6">
        {session.description}
      </p>

      {/* Bloc d'informations */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-2 text-sm text-gray-700">
        {session.room?.name && (
          <p>
            🏢 Salle : <span className="font-medium">{session.room.name}</span>
          </p>
        )}
        <p>
          🕒 Horaires :{" "}
          <span className="font-medium">
            {formatTime(session.startTime)} — {formatTime(session.endTime)}
          </span>
        </p>
        <p>
          👥 Capacité : <span className="font-medium">{session.capacity} personnes</span>{" "}
          <span className="text-gray-500">(information indicative)</span>
        </p>
      </div>

      {/* Section Intervenants */}
      {session.speakers?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Intervenants</h2>
          <div className="flex flex-wrap gap-4">
            {session.speakers.map((sp: any) => (
              <Link
                key={sp.id}
                href={`/speakers/${sp.id}`}
                className="flex items-center gap-2 hover:underline"
              >
                {sp.photoUrl ? (
                  <img
                    src={sp.photoUrl}
                    alt={sp.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    ?
                  </div>
                )}
                <span className="font-medium">{sp.fullName}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bouton favori (composant Harena) */}
      {/* <div className="mt-6">
        <FavoriteButton sessionId={session.id} />
      </div> */}

      {/* Q&A - placeholder (composant à ajouter quand prêt) */}
      {/*
      <div className="mt-10">
        <QASection sessionId={session.id} isLive={session.isLive} />
      </div>
      */}
    </div>
  );
}