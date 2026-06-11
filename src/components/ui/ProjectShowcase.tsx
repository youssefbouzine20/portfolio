'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  year: string;
  link?: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Project Sentinel — Smart Security Turnstile',
    description: 'Real-time biometric access control with facial recognition and liveness detection. ESP32-driven physical lock, PostgreSQL embeddings-only storage. 2nd place — National Robotics Competition (CNR) 2026.',
    year: '2026',
    link: undefined,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=560&h=360&fit=crop&auto=format',
    tags: ['Computer Vision', 'PostgreSQL', 'ESP32', 'Privacy-by-design'],
  },
  {
    title: 'BDIA Academic Portal',
    description: 'Academic portal centralizing educational resources for 200 students. JWT auth + Docker deployment.',
    year: '2025–26',
    link: 'https://bdia-major-nxbe.vercel.app/',
    image: '/academic-portal.png',
    tags: ['Node.js', 'MySQL', 'Docker', 'JWT'],
  },
  {
    title: 'AI Agent "Human-in-the-Loop"',
    description: 'Autonomous n8n agent integrating Groq (Llama 3) to automate email pre-analysis with human validation.',
    year: '2025–26',
    link: undefined,
    image: '/ai-agent.png',
    tags: ['n8n', 'Groq API', 'Llama 3', 'Webhooks'],
  },
  {
    title: 'ETL Pipeline — Top 10 Banks',
    description: 'End-to-end pipeline automating market cap collection for the world\'s 10 largest banks into SQLite.',
    year: '2025–26',
    link: undefined,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=560&h=360&fit=crop&auto=format',
    tags: ['Python', 'Pandas', 'SQLite', 'BeautifulSoup'],
  },
];

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef  = useRef<HTMLDivElement>(null);
  const animationRef  = useRef<number | null>(null);
  const mouseRef      = useRef({ x: 0, y: 0 });
  const smoothRef     = useRef({ x: 0, y: 0 });
  const previewRef    = useRef<HTMLDivElement>(null);

  /* Continuous lerp RAF — runs once, reads from refs to avoid re-creating on every mouse move */
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      smoothRef.current.x = lerp(smoothRef.current.x, mouseRef.current.x, 0.15);
      smoothRef.current.y = lerp(smoothRef.current.y, mouseRef.current.y, 0.15);
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${smoothRef.current.x + 24}px, ${smoothRef.current.y - 110}px, 0)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-3xl mx-auto px-6 py-16"
    >
      {/* ── Floating image preview ── */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl"
        style={{
          left: 0,
          top:  0,
          opacity:   isVisible ? 1 : 0,
          transform: `translate3d(0px, 0px, 0) scale(${isVisible ? 1 : 0.85})`,
          transition: 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-white/[0.05] rounded-2xl overflow-hidden
          border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.7)]">
          {projects.map((project, index) => (
            <Image
              key={project.title}
              src={project.image}
              alt={project.title}
              fill
              sizes="280px"
              className="object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale:   hoveredIndex === index ? '1' : '1.08',
                filter:  hoveredIndex === index ? 'none' : 'blur(8px)',
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/40 to-transparent" />
        </div>
      </div>

      {/* ── Project list ── */}
      <div className="space-y-0">
        {projects.map((project, index) => {
          const rowProps = {
            className: 'group block',
            onMouseEnter: () => { setHoveredIndex(index); setIsVisible(true);  },
            onMouseLeave: () => { setHoveredIndex(null);  setIsVisible(false); },
          };
          const row = (
              <div className="relative py-6 border-t border-white/[0.07] transition-all duration-300">
                {/* Hover background glow */}
                <div className={`absolute inset-0 -mx-4 px-4 bg-white/[0.03] rounded-xl
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <h3 className="text-white/80 font-semibold text-lg tracking-tight">
                        <span className="relative">
                          {project.title}
                          <span className={`absolute left-0 -bottom-0.5 h-px bg-white/60
                            transition-all duration-300 ease-out
                            ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
                        </span>
                      </h3>
                      {project.link && (
                        <ArrowUpRight className={`w-4 h-4 text-white/40 transition-all duration-300 ease-out
                          ${hoveredIndex === index
                            ? 'opacity-100 translate-x-0 translate-y-0'
                            : 'opacity-0 -translate-x-2 translate-y-2'}`} />
                      )}
                    </div>

                    <p className={`text-sm leading-relaxed transition-colors duration-300
                      ${hoveredIndex === index ? 'text-white/55' : 'text-white/30'}`}>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-1.5 mt-3 transition-all duration-300
                      ${hoveredIndex === index ? 'opacity-100' : 'opacity-40'}`}>
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 border border-white/10
                          bg-white/[0.05] text-white/40 rounded-full font-medium tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className={`text-xs font-mono tabular-nums shrink-0 transition-colors duration-300
                    ${hoveredIndex === index ? 'text-white/50' : 'text-white/20'}`}>
                    {project.year}
                  </span>
                </div>
              </div>
          );
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" {...rowProps}>
                  {row}
                </a>
              ) : (
                <div {...rowProps}>
                  {row}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Bottom border */}
        <div className="border-t border-white/[0.07]" />
      </div>
    </section>
  );
}
