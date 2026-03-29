import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects3DCarousel from '@/components/sections/Projects3DCarousel';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ContactFooter from '@/components/sections/ContactFooter';
import Chatbot from '@/components/ui/Chatbot';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-white w-full">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects3DCarousel />
      <ExperienceTimeline />
      <ContactFooter />
      <Chatbot />
    </main>
  );
}
