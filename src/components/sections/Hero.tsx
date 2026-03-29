'use client';
import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import DataNode3D from '../3d/DataNode';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Text Area */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-block px-4 py-2 bg-surface/80 border border-mint/20 rounded-full w-fit">
            <span className="text-mint font-medium text-sm tracking-wide">Data Engineer & Fullstack Dev</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight font-poppins text-white">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-light">Ayoub.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            Building intelligent <strong className="text-white">Data Pipelines</strong> & Scalable <strong className="text-white">Backends</strong>.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <AnimatedButton variant="solid" href="#projects">
              View Projects
            </AnimatedButton>
            <AnimatedButton variant="outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Download CV
            </AnimatedButton>
          </div>
        </motion.div>

        {/* 3D Graphic Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[50vh] lg:h-[80vh] w-full flex items-center justify-center pointer-events-none"
        >
          <div className="w-full h-full relative pointer-events-auto cursor-grab active:cursor-grabbing">
            <DataNode3D />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-mint/50 rounded-full flex justify-center py-1 cursor-none"
        >
          <div className="w-1.5 h-1.5 bg-mint rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
