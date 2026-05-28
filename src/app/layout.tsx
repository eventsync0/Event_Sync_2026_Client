import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import {
  Plus_Jakarta_Sans,
  Fira_Code,
  Audiowide,
  Quicksand,
} from "next/font/google";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

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
    <html lang="fr" suppressHydrationWarning   className={`
      ${plusJakarta.variable}
      ${firaCode.variable}
      ${audiowide.variable}
      ${quicksand.variable}
    `}>
      <body className="bg-background text-text-body antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 ">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}