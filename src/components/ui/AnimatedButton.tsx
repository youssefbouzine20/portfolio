'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  onClick?: () => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function AnimatedButton({ children, variant = 'solid', onClick, className = '', href, target, rel, type = 'button' }: Props) {
  const base = 'px-6 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-95';
  const solid = 'bg-white text-[#0a0a0c] hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.15)]';
  const outline = 'bg-transparent border border-white/25 text-white/60 hover:border-white/50 hover:text-white h-[50px]';
  const Element = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ y: -2 }} className="inline-block">
      <Element onClick={onClick} href={href} target={target} rel={rel}
        type={href ? undefined : type}
        className={`${base} ${variant === 'solid' ? solid : outline} ${className}`}>
        {children}
      </Element>
    </motion.div>
  );
}
