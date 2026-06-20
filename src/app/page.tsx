
import AboutSection from '@/components/home/AboutSection';
import EventSection from '@/components/home/EventSection';
import HeroSection from '@/components/home/HeroSection';
import SpeakerSection from '@/components/home/SpeakerSection';


export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <EventSection limit={3} />
      <SpeakerSection />
      <AboutSection />  
    </div>
  );
}