'use client';
import React, { useEffect, useRef } from 'react';

/**
 * ASMRBackground
 * High-density particle canvas — glass-shard & charcoal-dust aesthetic.
 * Magnetic vortex + friction glow on mouse hover.
 * Renders as a full-bleed background layer (position: absolute).
 */
const ASMRBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect users who opt out of motion — the page works fine without the effect
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const MAX_PARTICLES = 1000;
    const MAGNETIC_RADIUS = 280;
    const VORTEX_STRENGTH = 0.07;
    const PULL_STRENGTH = 0.12;

    class Particle {
      x = 0; y = 0;
      vx = 0; vy = 0;
      size = 0; alpha = 0;
      color = ''; rotation = 0;
      rotationSpeed = 0; frictionGlow = 0;

      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        const isGlass = Math.random() > 0.7;
        this.color = isGlass ? '220, 235, 255' : '90, 90, 95';
        this.alpha = Math.random() * 0.4 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.frictionGlow = 0;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
          this.vx += (dx / dist) * force * PULL_STRENGTH;
          this.vy += (dy / dist) * force * PULL_STRENGTH;
          this.vx += (dy / dist) * force * VORTEX_STRENGTH * 10;
          this.vy -= (dx / dist) * force * VORTEX_STRENGTH * 10;
          this.frictionGlow = force * 0.7;
        } else {
          this.frictionGlow *= 0.92;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vx += (Math.random() - 0.5) * 0.04;
        this.vy += (Math.random() - 0.5) * 0.04;
        this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.9);
        ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;
        if (this.frictionGlow > 0.3) {
          ctx.shadowBlur = 8 * this.frictionGlow;
          ctx.shadowColor = `rgba(180, 220, 255, ${this.frictionGlow})`;
        }
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2.5);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 2.5);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      // Render at device resolution (capped at 2x) so the canvas is sharp on retina displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Scale particle density to viewport area so phones aren't pushed as hard as desktops
      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / 2200));
      particles = Array.from({ length: count }, () => new Particle());
    };

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.18)';
      ctx.fillRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }
    };
    const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    // Pause the animation loop while the tab is in the background
    const handleVisibility = () => {
      cancelAnimationFrame(animationFrameId);
      if (!document.hidden) animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    init();
    render();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 block w-full h-full z-0"
      aria-hidden="true"
    />
  );
};

export default ASMRBackground;
