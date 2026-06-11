'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  { title: "Cycle Ingénieur — Big Data & Intelligence Artificielle", organization: "ENSATÉ — École Nationale des Sciences Appliquées de Tétouan", date: "2025 – 2028", description: "Big Data Architectures, advanced algorithms, data analysis and visualization, software design, and distributed systems engineering.", type: "education" },
  { title: "Data Engineering Professional Certificate", organization: "IBM", date: "In Progress — 6 modules completed", description: "Linux Commands, Shell Scripting, Git, SQL for Data Science, RDBMS, and Python for Data Engineering and AI.", type: "certification" },
  { title: "Machine Learning Specialization", organization: "DeepLearning.AI", date: "In Progress", description: "Supervised learning, neural networks, and practical ML techniques taught by Andrew Ng.", type: "certification" },
  { title: "Lead Designer — Hitchcock Club", organization: "ENSATÉ Student Clubs", date: "2025 – Present", description: "Designed the club's complete visual identity and authored the institutional founding dossier, approved by the ENSA administration.", type: "leadership" },
  { title: "Visual Designer — AI Geeks Club", organization: "ENSATÉ Student Clubs", date: "2025 – Present", description: "Created the visual communication materials for technical events organized within ENSA.", type: "leadership" },
  { title: "Cycle Préparatoire Intégré", organization: "ENSATÉ — École Nationale des Sciences Appliquées de Tétouan", date: "2023 – 2025", description: "Intensive scientific training in mathematics, physics, and computer science. Preparation for national entrance exams to engineering schools.", type: "education" },
  { title: "Introduction to Git and GitHub", organization: "Google", date: "2024", description: "Version control fundamentals, branching workflows, and collaborative development practices.", type: "certification" },
  { title: "Baccalauréat Sciences Physiques — Mention Bien", organization: "Lycée Paul Sabatier", date: "2023", description: "Graduated with honours (Mention Bien) in physical sciences and mathematics.", type: "education" },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={containerRef} className="w-full min-h-screen py-28 px-6 relative">
      <div className="container mx-auto max-w-4xl">

        <div className="text-center mb-20">
          <span className="text-white/25 font-semibold uppercase tracking-widest text-xs block mb-4">Background</span>
          <h2 className="text-4xl md:text-5xl font-black text-white/90">Education & Involvement</h2>
        </div>

        <div className="relative">
          {/* Base line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 rounded-full" />
          {/* Animated fill */}
          <motion.div style={{ height: pathHeight }}
            className="absolute left-[28px] md:left-1/2 top-0 w-px bg-white/40 -translate-x-1/2 rounded-full origin-top" />

          <div className="flex flex-col gap-12 relative">
            {timelineData.map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-[45%]" />

                {/* Node */}
                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full
                  bg-white/[0.08] backdrop-blur-sm border border-white/20 z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className={`w-full md:w-[45%] pl-14 md:pl-0 ${idx % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}>
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-5 rounded-2xl
                    hover:bg-white/[0.07] hover:border-white/15 transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-2.5 ${idx % 2 !== 0 ? 'md:justify-end' : ''}`}>
                      <span className="text-white/30 text-xs font-bold tracking-wider uppercase">{item.date}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/10
                        text-white/30 font-semibold uppercase tracking-wide">
                        {item.type === 'education' ? 'Education' : item.type === 'leadership' ? 'Leadership' : 'Certification'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white/80 mb-1 leading-snug">{item.title}</h3>
                    <h4 className="text-white/40 font-medium mb-2.5 text-sm">{item.organization}</h4>
                    <p className="text-white/30 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
