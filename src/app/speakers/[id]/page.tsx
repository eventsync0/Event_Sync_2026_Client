export default async function SpeakerPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3001/speakers/${params.id}`);

  if (!res.ok) {
    throw new Error("Erreur lors du chargement du speaker");
  }

  const json = await res.json();
  const speaker = json.data;

  if (!speaker) {
    return <div>Speaker introuvable</div>;
  }

  return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="flex gap-6 items-start">
      {speaker.photoUrl && (
        <img
          src={speaker.photoUrl}
          alt={speaker.fullName}
          className="w-32 h-32 rounded-full object-cover shrink-0"
        />
      )}

      <div>
        <h1 className="text-3xl font-bold">
          {speaker.fullName}
        </h1>

        {speaker.bio && (
          <p className="text-gray-600 mt-3">
            {speaker.bio}
          </p>
        )}
}