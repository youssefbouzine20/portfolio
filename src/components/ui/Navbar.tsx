'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md py-4 shadow-lg shadow-mint/5 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white hover:text-mint transition-colors">
          Ay<span className="text-mint">oub</span>.
        </a>

        <div className="hidden md:flex gap-8 items-center cursor-none">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-mint transition-colors relative group cursor-none"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 text-sm font-bold text-background bg-mint rounded-full hover:bg-mint-light transition-colors transform hover:scale-105 active:scale-95 cursor-none"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </motion.nav>
  );
}
