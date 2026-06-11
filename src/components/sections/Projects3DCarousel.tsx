'use client';
import { motion } from 'framer-motion';
import { ProjectShowcase } from '@/components/ui/ProjectShowcase';

export default function Projects3DCarousel() {
  return (
    <section id="projects" className="w-full py-20 relative flex flex-col items-center">
      <div className="container mx-auto px-6 flex flex-col items-center w-full">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 w-full max-w-3xl"
        >
          <span className="text-white/25 font-semibold uppercase tracking-widest text-xs block mb-4">Work</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white/90">
            Technical Projects
          </h2>
        </motion.div>

        <ProjectShowcase />
      </div>
    </section>
  );
}
