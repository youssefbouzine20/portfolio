'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-surface py-20 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-mint/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div style={{ y, opacity }} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Photo */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-full md:h-80 rounded-3xl overflow-hidden border-2 border-mint/20 shadow-[0_0_30px_rgba(0,255,163,0.15)] group">
              <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center text-gray-500 text-xs text-center p-4">
                <span>Put your photo here:</span>
                <span className="font-mono mt-1 text-mint">public/profile.png</span>
              </div>
              <img 
                src="/profile.png" 
                alt="Ayoub Baidane" 
                className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <div className="absolute inset-0 bg-mint/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="w-12 h-[1px] bg-mint"></span>
              <span className="text-mint font-bold uppercase tracking-widest text-sm">Profile</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-black font-poppins leading-tight text-gray-100">
              Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-light">Big Data & AI</span> engineering student at ENSA Tétouan.
            </h2>
            
            <div className="flex flex-col gap-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                Specializing in <strong className="text-white font-medium">data architecture, scalable pipelines,</strong> and <strong className="text-white font-medium">machine learning</strong>. Proficient in leveraging modern technologies such as <strong className="text-mint">Apache Spark, Kafka, and Hadoop</strong>, alongside Python and SQL, to process complex datasets.
              </p>
              <p>
                Passionate about transforming raw data into intelligent, automated solutions and eager to contribute as a Data or ML Engineer.
              </p>
              <p className="text-base text-gray-500 mt-4 border-t border-white/10 pt-4 flex flex-col xl:flex-row gap-2 xl:gap-4 justify-between">
                <span>📍 Based in Tétouan, Morocco 🇲🇦</span>
                <span className="text-mint">Available for National & Remote positions</span>
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
