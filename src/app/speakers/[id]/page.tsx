export default async function SpeakerPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:PORT/speakers/${params.id}`);

  const json = await res.json();
  const speaker = json.data;

  return (
    <div>
      <h1>{speaker.fullName}</h1>
    </div>
  );
}