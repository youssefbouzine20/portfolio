'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

// ─── BlurText ────────────────────────────────────────────────────────────────
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const BlurText: React.FC<BlurTextProps> = ({ text, delay = 50, animateBy = 'words', direction = 'top', className = '', style, as: Tag = 'p' }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const segments = useMemo(() => animateBy === 'words' ? text.split(' ') : text.split(''), [text, animateBy]);

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span key={i} style={{
          display: 'inline-block',
          filter: inView ? 'blur(0px)' : 'blur(10px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
          transition: `all 0.5s ease-out ${i * delay}ms`,
        }}>
          {segment}{animateBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
};

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
];

// ─── Hero (with navigation) ──────────────────────────────────────────────────
export default function Hero() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState('');
  const [navVisible, setNavVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef               = useRef<HTMLDivElement>(null);
  const mobileButtonRef             = useRef<HTMLButtonElement>(null);

  // Glass backdrop appears after scrolling 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Stagger-reveal nav links on load
  useEffect(() => {
    const t = setTimeout(() => setNavVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileOpen && mobileMenuRef.current && mobileButtonRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !mobileButtonRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  return (
    <div className="relative min-h-screen">

      {/* ═══════════════════════════════════════════════
          HEADER — desktop links visible, glass on scroll
          ═══════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-500">

        {/* Glass backdrop pill — fades in after scroll */}
        <div className={`absolute inset-x-4 inset-y-2 rounded-2xl transition-all duration-500 pointer-events-none
          ${scrolled
            ? 'bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-transparent'
          }`} />

        <nav className="relative flex items-center justify-between max-w-screen-xl mx-auto">

          {/* ── Signature ── */}
          <a href="#" aria-label="Home"
            className="text-3xl text-white/70 hover:text-white transition-colors duration-300 select-none z-10"
            style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            Y
          </a>

          {/* ── Desktop nav links (hidden on mobile) ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide rounded-xl
                    transition-all duration-200 group
                    ${isActive ? 'text-white' : 'text-white/35 hover:text-white/80'}`}
                  style={{
                    opacity: navVisible ? 1 : 0,
                    transform: navVisible ? 'translateY(0)' : 'translateY(-12px)',
                    filter: navVisible ? 'blur(0px)' : 'blur(6px)',
                    transition: `opacity 0.5s ease ${i * 80 + 600}ms,
                                 transform 0.5s ease ${i * 80 + 600}ms,
                                 filter 0.5s ease ${i * 80 + 600}ms,
                                 color 0.2s ease`,
                  }}
                >
                  {item.label}

                  {/* Hover underline */}
                  <span className={`absolute bottom-1 left-4 right-4 h-[1px] rounded-full
                    transition-all duration-200 origin-left
                    ${isActive ? 'bg-white/60 scale-x-100' : 'bg-white/30 scale-x-0 group-hover:scale-x-100'}`} />
                </a>
              );
            })}
          </div>

          {/* ── Mobile hamburger ── */}
          <div className="relative md:hidden">
            <button ref={mobileButtonRef} type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/35 hover:text-white transition-colors duration-200">
              {mobileOpen
                ? <X className="w-6 h-6" strokeWidth={1.5} />
                : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>

            {mobileOpen && (
              <div ref={mobileMenuRef}
                className="absolute top-full right-0 mt-3 w-[200px]
                  bg-[#0a0a0c]/90 backdrop-blur-xl rounded-2xl border border-white/10
                  shadow-[0_16px_48px_rgba(0,0,0,0.6)] p-3 z-[100]">
                {[{ label: 'Home', href: '#' }, ...NAV_ITEMS].map((item) => (
                  <a key={item.label} href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold py-2 px-3 rounded-xl
                      text-white/50 hover:text-white hover:bg-white/[0.07] transition-all duration-150">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════
          HERO — centred name + profile + tagline
          ═══════════════════════════════════════════════ */}
      <main className="relative min-h-screen flex flex-col">

        {/* Giant name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center">
            <h1>
              <BlurText as="span" text="Youssef" delay={80} animateBy="letters" direction="top"
                className="font-black text-[18vw] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.8] tracking-tighter uppercase justify-center"
                style={{ color: 'rgba(255,255,255,0.88)', fontFamily: "'Inter', sans-serif" }} />
              <BlurText as="span" text="Bouzine" delay={80} animateBy="letters" direction="top"
                className="font-black text-[18vw] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.8] tracking-tighter uppercase justify-center"
                style={{ color: 'rgba(255,255,255,0.88)', fontFamily: "'Inter', sans-serif" }} />
            </h1>

            {/* Profile photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px]
                rounded-full overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.8)]
                ring-1 ring-white/10 transition-transform duration-300 hover:scale-110">
                <Image src="/profile.jpg" alt="Youssef Bouzine" fill priority
                  sizes="(min-width: 1024px) 129px, (min-width: 768px) 110px, (min-width: 640px) 90px, 65px"
                  className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText text="Building intelligent systems at the edge of Data & AI."
              delay={120} animateBy="words" direction="top"
              className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-center tracking-wide"
              style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", fontWeight: 300 }} />
          </div>
        </div>

        {/* Scroll caret */}
        <button type="button" aria-label="Scroll down"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/15 hover:text-white/40 transition-colors duration-300" />
        </button>
      </main>
    </div>
  );
}
