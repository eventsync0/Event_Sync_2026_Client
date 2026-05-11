import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      
      {/* Message principal */}
      <h1 className="text-2xl font-bold text-gray-800">
        Session introuvable
      </h1>

      {/* Description */}
      <p className="mt-2 text-gray-500 max-w-md">
        La session que vous recherchez n’existe pas ou a été supprimée.
      </p>

      {/* Bouton retour */}
      <Link
        href="/sessions"
        className="mt-6 px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Retour aux sessions
      </Link>
    </div>
  );
}