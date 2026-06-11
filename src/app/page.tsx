import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects3DCarousel from '@/components/sections/Projects3DCarousel';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import ContactFooter from '@/components/sections/ContactFooter';
import Chatbot from '@/components/ui/Chatbot';
import { GlassmorphismPortfolioBlock } from '@/components/ui/glassmorphism-portfolio-block';

export default function Home() {
  return (
    <main className="min-h-screen w-full text-white">
      <Hero />
      <About />
      <GlassmorphismPortfolioBlock />
      <Skills />
      <Projects3DCarousel />
      <ExperienceTimeline />
      <ContactFooter />
      <Chatbot />
    </main>
  );
}
