'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 mb-8 text-sm font-medium text-txt-secondary bg-bg-card border border-border rounded-2xl hover:bg-bg-subtle hover:border-coffee-300 dark:hover:border-coffee-700 transition-all duration-300 group"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
      <span>Back to Events</span>
    </button>
  );
}