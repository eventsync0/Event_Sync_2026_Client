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
}