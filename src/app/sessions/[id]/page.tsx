import { notFound } from "next/navigation";

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

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-black">
        {session.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mt-4 text-lg leading-relaxed">
        {session.description}
      </p>

      {/* INFO BLOCK */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-700">
          📅 Date : <span className="font-medium">{session.date}</span>
        </p>
      </div>

    </div>
  );
}