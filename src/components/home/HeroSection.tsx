import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-4 text-stone-950">
        Bienvenue sur <span className="text-blue-600">EventSync</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Découvrez et participez aux événements en direct
      </p>
      <Link 
        href="/events" 
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Voir les événements
      </Link>
    </section>
  );
}