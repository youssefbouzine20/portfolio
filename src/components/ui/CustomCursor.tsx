'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Hide on touch-primary devices — no mouse cursor needed
    if (window.matchMedia('(hover: none)').matches) {
      dot.style.display = 'none';
      return;
    }

    let rafId: number;
    let mouseX = -100, mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved.current) {
        hasMoved.current = true;
        dot.style.opacity = '1';
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovered.current =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        !!target.closest('a') ||
        !!target.closest('button');
      updateStyle();
    };

    const updateStyle = () => {
      if (!dot) return;
      if (isHovered.current) {
        dot.style.width = '40px';
        dot.style.height = '40px';
        dot.style.backgroundColor = 'rgba(255,255,255,0.10)';
        dot.style.border = '0px solid transparent';
        dot.style.backdropFilter = 'blur(1px)';
      } else {
        dot.style.width = '16px';
        dot.style.height = '16px';
        dot.style.backgroundColor = 'rgba(0,0,0,0)';
        dot.style.border = '1.5px solid rgba(255,255,255,0.7)';
        dot.style.backdropFilter = 'none';
      }
    };

    const render = () => {
      if (dot) {
        const offset = isHovered.current ? 20 : 8;
        dot.style.transform = `translate3d(${mouseX - offset}px, ${mouseY - offset}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    // Start hidden — only reveal after first real mouse move
    dot.style.opacity = '0';

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        width: '16px',
        height: '16px',
        opacity: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        border: '1.5px solid rgba(255,255,255,0.7)',
        transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease, border 0.15s ease, opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  );
}

