'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  { 
    title: "Academic Resource Portal", 
    desc: "A centralized web platform (Big Data & AI Major) to organize academic resources, student projects, and training courses with secure authentication and RESTful APIs.", 
    tags: ["React", "Node.js", "MySQL", "Docker"],
    color: "from-mint to-[#0f172a]",
    link: "https://bdia-major-nxbe.vercel.app/",
    linkLabel: "Live Site"
  },
  { 
    title: "Music Similarity System", 
    desc: "A machine learning model (2022-2023) that recommends the Top-10 most similar songs using extracted audio embeddings, vector distances, and cosine similarity.", 
    tags: ["Python", "Embeddings", "Machine Learning"],
    color: "from-blue-500 to-[#0f172a]",
    link: "https://www.kaggle.com/code/baidaneayoub/ai-music-assistant-project-overview",
    linkLabel: "Kaggle Code"
  },
  { 
    title: "Real-Time Data Streaming", 
    desc: "End-to-End Data Engineering project covering data ingestion, real-time processing, and scalable storage using modern streaming architectures.", 
    tags: ["Apache Kafka", "Apache Spark", "Airflow", "Python"],
    color: "from-purple-500 to-[#0f172a]"
  }
];

export default function Projects3DCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section id="projects" className="w-full min-h-[90vh] py-24 bg-background relative flex flex-col justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,163,0.03)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-poppins mb-12 text-center">
          Featured <span className="text-mint">Projects</span>
        </h2>
        
        <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[500px]" style={{ perspective: 1200 }}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="w-full bg-surface rounded-3xl p-2 md:p-3 border border-white/5 shadow-2xl relative group">
                <div className="w-full h-full bg-[#0a0f1c] rounded-[20px] p-8 md:p-12 flex flex-col relative overflow-hidden min-h-[400px]">
                  {/* Glow effect */}
                  <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${projects[currentIndex].color} blur-[80px] opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="flex-1 flex flex-col justify-center relative z-10">
                    <span className="text-mint text-xs md:text-sm font-bold tracking-widest mb-4 uppercase">Project 0{currentIndex + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{projects[currentIndex].title}</h3>
                    <p className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">{projects[currentIndex].desc}</p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3 mt-auto items-center">
                      {projects[currentIndex].tags.map(tag => (
                        <span key={tag} className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 border border-mint/30 bg-mint/5 text-mint rounded-full backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                      {(projects[currentIndex] as any).link && (
                        <a 
                          href={(projects[currentIndex] as any).link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="ml-auto text-xs md:text-sm font-bold px-4 py-1.5 border border-mint bg-mint/20 text-white rounded-full hover:bg-mint hover:text-background transition-colors cursor-none flex items-center gap-2"
                        >
                          ↗ {(projects[currentIndex] as any).linkLabel || "View Project"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={prevProject} 
            className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-surface border border-white/10 rounded-full flex items-center justify-center text-white hover:text-mint hover:border-mint transition-all z-20 shadow-lg cursor-none active:scale-95"
          >
             <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextProject} 
            className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-surface border border-white/10 rounded-full flex items-center justify-center text-white hover:text-mint hover:border-mint transition-all z-20 shadow-lg cursor-none active:scale-95"
          >
             <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex gap-3 mt-10">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-none ${currentIndex === idx ? 'w-8 bg-mint' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
