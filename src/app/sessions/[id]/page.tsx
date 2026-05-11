export default async function SessionPage({ params }: { params: { id: string } }) {
  const API_URL = "http://localhost:3001/api";

  const res = await fetch(`${API_URL}/sessions/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error while loading session");
  }

  const json = await res.json();
  const session = json.data;

  return (
    <div>
      <h1>{session.title}</h1>
    </div>
  );
}