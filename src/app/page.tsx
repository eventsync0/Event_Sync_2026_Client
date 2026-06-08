import EventSection from '@/components/sections/EventSection';
import HeroSection from '@/components/sections/HeroSection';
import SpeakerSection from '@/components/sections/SpeakerSection';

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <EventSection />
      <SpeakerSection />
    </div>
  );
}