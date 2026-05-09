"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { Event, Session } from "@/types";
import { formatFullDate, formatTime, isLive } from "@/lib/utils";
import { Clock, Users } from "lucide-react";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEventDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (err: unknown) {
        console.error(err);
        setError("Impossible de charger les détails de l'événement");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl">{error || "Événement non trouvé"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <p className="text-gray-600 text-lg max-w-3xl">{event.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-black mb-1">Date</p>
                <p className="font-medium text-black">
                  {formatFullDate(event.startDate)}
                </p>
              </div>

              <div>
                <p className="text-sm text-black mb-1">Horaires</p>
                <p className="font-medium text-black">
                  {formatTime(event.startDate)} — {formatTime(event.endDate)}
                </p>
              </div>

              <div>
                <p className="text-sm text-black mb-1">Lieu</p>
                <p className="font-medium text-black">{event.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Sessions</h2>

          {event.sessions && event.sessions.length > 0 ? (
            <div className="space-y-6">
              {event.sessions.map((session: Session) => {
                const live = isLive(session.startTime, session.endTime);

                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {session.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {session.description}
                        </p>
                      </div>
                      {live && (
                        <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="flex gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formatTime(session.startTime)} -{" "}
                        {formatTime(session.endTime)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {session.capacity} places
                      </div>
                    </div>

                    {session.room && (
                      <p className="text-sm text-gray-500 mt-3">
                        Salle :{" "}
                        <span className="font-medium">{session.room.name}</span>
                      </p>
                    )}
                    {(() => {
                      const live = isLive(session.startTime, session.endTime);
                      console.log("Session:", session.title, "isLive:", live);
                      console.log(
                        "Start:",
                        session.startTime,
                        "Now:",
                        new Date(),
                        "End:",
                        session.endTime,
                      );
                      return (
                        live && (
                          <Link
                            href={`/events/${event.id}/sessions/${session.id}`}
                            className="mt-6 inline-block text-blue-600 hover:underline font-medium"
                          >
                            Voir les questions en direct →
                          </Link>
                        )
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Aucune session pour cet événement.</p>
          )}
        </div>
      </div>
    </div>
  );
}
