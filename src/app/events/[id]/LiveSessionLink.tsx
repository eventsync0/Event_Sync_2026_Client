'use client';

import Link from 'next/link';

export default function LiveSessionLink({ eventId, sessionId }: { eventId: string; sessionId: string }) {
  return (
    <Link
      href={`/events/${eventId}/sessions/${sessionId}`}
      className="inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold group mt-2"
    >
      Join Live Q&A
      <span className="group-hover:translate-x-1 transition">→</span>
    </Link>
  );
}