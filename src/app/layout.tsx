// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/common/ThemeProvider'; // Import du provider

export const metadata: Metadata = {
  title: 'EventSync - Événements en direct',
  description: 'Plateforme de gestion d’événements avec interaction en temps réel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // On retire toute classe forcée, next-themes va gérer l'injection de .dark ici
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-background text-text-body antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}