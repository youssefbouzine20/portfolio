'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  {
    title: "Engineering Degree in Big Data & AI",
    organization: "École Nationale des Sciences Appliquées de Tétouan (ENSA)",
    date: "Ongoing",
    description: "Specializing in data architecture, scalable pipelines, machine learning, and complex dataset processing."
  },
  {
    title: "IBM Data Engineering Professional Certificate",
    organization: "IBM",
    date: "Oct 2025 - Feb 2026",
    description: "Mastered Linux Commands, Shell Scripting, Git, SQL for Data Science, RDBMS, and Python for Data Engineering and AI."
  },
  {
    title: "Baccalauréat Sciences Physiques",
    organization: "High School Diploma - Morocco",
    date: "2022 - 2023",
    description: "Graduated with honors in physical sciences and mathematics."
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="w-full min-h-screen bg-surface py-24 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center font-poppins">
          Experience & <span className="text-mint">Education</span>
        </h2>

        <div className="relative">
          {/* Background line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full"></div>
          
          {/* Animated glowing line */}
          <motion.div 
            style={{ height: pathHeight }}
            className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-mint shadow-[0_0_15px_#00ffa3] -translate-x-1/2 rounded-full"
          ></motion.div>

          <div className="flex flex-col gap-12">
            {timelineData.map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-[45%]"></div>
                
                {/* Node Center */}
                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-surface border-4 border-mint z-10 shadow-[0_0_10px_rgba(0,255,163,0.5)] flex items-center justify-center">
                  <div className="w-2 h-2 bg-mint rounded-full"></div>
                </div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`w-full md:w-[45%] pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:text-left md:pl-8' : 'md:text-right md:pr-8'}`}
                >
                  <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/5 shadow-xl hover:border-mint/30 transition-colors duration-300">
                    <span className="text-mint text-sm font-bold tracking-wider uppercase mb-1 block">{item.date}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <h4 className="text-gray-400 font-medium mb-4">{item.organization}</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">{item.description}</p>
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
