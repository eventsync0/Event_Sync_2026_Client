"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

export default function SpeakerPage({ params }: Props) {
  const API_URL = "http://localhost:3001/api";

  const [speaker, setSpeaker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

   if (!res.ok) {
    console.log("Fetch failed. Status:", res.status);
    notFound();
  }

  const json = await res.json();
  const speaker = json.data;

   if (!speaker) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

       <Link href="/speakers" className="text-blue-600 hover:underline">
        ← Back to speakers
      </Link>

       <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8">

        <div className="flex flex-col md:flex-row gap-8">

           <div className="shrink-0">
            {speaker.photoUrl ? (
              <img
                src={speaker.photoUrl}
                alt={speaker.fullName}
                className="w-40 h-40 rounded-full object-cover"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

           <div className="flex-1">

            <h1 className="text-4xl font-bold text-gray-900">
              {speaker.fullName}
            </h1>

            {speaker.bio && (
              <p className="text-gray-600 mt-5 leading-relaxed">
                {speaker.bio}
              </p>
            )}

             {speaker.links?.length > 0 && (
              <div className="flex gap-4 mt-6">

                {speaker.links.map((link: any) => {
                  const platform = link.platform?.toLowerCase();

                  let icon = <FaGlobe className="text-xl" />;

                  if (platform === "linkedin") {
                    icon = <FaLinkedin className="text-xl" />;
                  } else if (platform === "github") {
                    icon = <FaGithub className="text-xl" />;
                  }

                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-110 transition flex items-center justify-center"
                      title={link.platform}
                    >
                      {icon}
                    </a>
                  );
                })}

              </div>
            )}

          </div>
        </div>
      </div>

       <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Speaker Sessions
        </h2>

        {speaker.sessions?.length > 0 ? (
          <div className="space-y-5">

            {speaker.sessions.map((session: any) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-2xl p-5 bg-white"
              >

                <div className="flex items-center gap-3">

                  {/* LIVE supprimé (non garanti par doc) */}

                  <Link
                    href={`/sessions/${session.id}`}
                    className="text-xl font-semibold hover:text-blue-600 transition"
                  >
                    {session.title}
                  </Link>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {session.startTime} — {session.endTime}
                </p>

                {/* ROOM supprimé (structure non garantie) */}

                 {session.questions?.length > 0 && (
                  <details className="mt-5">

                    <summary className="cursor-pointer text-sm text-gray-600">
                      View questions ({session.questions.length})
                    </summary>

                    <div className="mt-4 space-y-3">

                      {session.questions.map((question: any) => (
                        <div
                          key={question.id}
                          className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg"
                        >
                          <p className="text-gray-800">
                            {question.content}
                          </p>

                          <div className="text-sm text-gray-500 mt-2">
                            {question.name ?? "Anonymous"} • {question.upvotes} upvote(s)
                          </div>
                        </div>
                      ))}

                    </div>

                  </details>
                )}

              </div>
            ))}

          </div>
        ) : (
          <div className="text-gray-500">
            No sessions found.
          </div>
        )}

      </div>
    </div>
  );
}