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
  const baseClasses = "px-6 py-3 rounded-full font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 cursor-none";
  const solidClasses = "bg-mint text-background hover:bg-mint-light shadow-[0_0_15px_rgba(0,255,163,0.3)] hover:shadow-[0_0_25px_rgba(0,255,163,0.5)]";
  const outlineClasses = "bg-transparent border-2 border-mint text-mint hover:bg-mint/10 h-[50px]";

  const appliedClass = variant === 'solid' ? solidClasses : outlineClasses;
  const Element = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Element
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        type={href ? undefined : type}
        className={`${baseClasses} ${appliedClass} ${className}`}
      >
        {children}
      </Element>
    </motion.div>
  );
}
