'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center py-28 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div style={{ y, opacity }} className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

          {/* Photo */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-64 h-72 md:w-full md:h-96 rounded-3xl overflow-hidden
              bg-white/[0.04] backdrop-blur-sm border border-white/10
              shadow-[0_8px_48px_rgba(0,0,0,0.4)] group">
              <Image src="/profile.jpg" alt="Youssef Bouzine" fill
                sizes="(min-width: 768px) 33vw, 256px"
                className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="text-white/30 font-semibold uppercase tracking-widest text-xs">Profile</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white/90">
              Engineering student in{' '}
              <span lang="fr" className="italic font-light text-white/50">Sciences des Données, Big Data & IA.</span>
            </h2>

            <div className="flex flex-col gap-5 text-lg text-white/50 font-light leading-relaxed">
              <p>
                Specializing in{' '}
                <strong className="text-white/80 font-semibold">Python, predictive modeling,</strong>{' '}
                and automation via{' '}
                <strong className="text-white/80 font-semibold">AI agents</strong>. Expert in designing
                end-to-end solutions — from data platform architecture and machine learning to
                containerized deployments with Docker.
              </p>
              <p>
                Rigorous and results-oriented, actively seeking an internship to apply technical expertise
                to innovative, high-impact projects.
              </p>
              <p className="text-sm text-white/25 mt-2 border-t border-white/10 pt-4 flex flex-col xl:flex-row gap-2 xl:gap-6 justify-between">
                <span>📍 Rabat, Morocco</span>
                <span className="text-white/50 font-medium">Seeking an internship</span>
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
