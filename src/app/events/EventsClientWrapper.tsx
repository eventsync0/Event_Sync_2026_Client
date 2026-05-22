'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EventsClientWrapper() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRetry = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <button
      onClick={handleRetry}
      disabled={isRefreshing}
      className="px-8 py-3 bg-primary hover:bg-primary-600 text-white rounded-2xl font-medium transition-all disabled:opacity-70"
    >
      {isRefreshing ? 'Refreshing...' : 'Retry'}
    </button>
  );
}