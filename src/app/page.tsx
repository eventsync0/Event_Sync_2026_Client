import AboutSection from '@/components/home/AboutSection';
import EventSection from '@/components/home/EventSection';
import HeroSection from '@/components/home/HeroSection';

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <EventSection limit={3} />
      <AboutSection />  
    </div>
  );
}