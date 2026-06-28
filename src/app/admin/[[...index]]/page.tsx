'use client';

import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('../components/AdminApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-600 font-medium">Chargement du panneau d'administration...</p>
    </div>
  ),
});

export default function AdminPage() {
  return <AdminApp />;
}