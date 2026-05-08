export default async function SpeakerPage({
  params,
}: {
  params: { id: string };
}) {
  const API_URL = "http://localhost:3001/api";
 
  const res = await fetch(`${API_URL}/speakers/${params.id}`);
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

                {speaker.links?.length > 0 && (
          <div className="flex gap-3 mt-4">
            {speaker.links.map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline capitalize"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>

    <h2 className="text-xl font-semibold mt-10 mb-4">
      Ses sessions
    </h2>
        {speaker.sessions?.length > 0 ? (
      speaker.sessions.map((session: any) => (
        <div
          key={session.id}
          className="border rounded-lg p-4 mb-3"
        >
          <div className="flex items-center gap-3">
            {session.isLive && (
              <span className="text-red-500 font-bold">
                LIVE
              </span>
            )}

            <a
              href={`/sessions/${session.id}`}
              className="font-semibold hover:underline"
            >
              {session.title}
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {session.startTime} — {session.endTime} |{" "}
            {session.room?.name}
          </p>
                  {session.questions?.length > 0 && (
            <details className="mt-3">
              <summary className="text-sm text-gray-500 cursor-pointer">
                {session.questions.length} question(s) posée(s)
              </summary>

              {session.questions.map((q: any) => (
                <div
                  key={q.id}
                  className="mt-2 pl-3 border-l text-sm"
                >
                  <p>{q.content}</p>
                  <p className="text-gray-400">
                    {q.authorName} — {q.upvotes} upvote(s)
                  </p>
                </div>
              ))}
            </details>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500">Aucune session</p>
    )}
    </div>
    );
}