'use client';
import { Mail, Send, FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import AnimatedButton from '../ui/AnimatedButton';

export default function ContactFooter() {
  return (
    <footer id="contact" className="w-full bg-[#0a0f1c] pt-24 pb-8 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-mint/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Left Side */}
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight font-poppins">
              Let's build something <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint to-mint-light">great together.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Whether you have a project in mind, need a data pipeline architected, or just want to chat about AI.
            </p>
            
            <div className="flex gap-4 mt-8">
              <a href="https://github.com/BaidaneAyoub" target="_blank" rel="noreferrer" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/10 hover:border-mint hover:text-mint transition-all cursor-none group relative overflow-hidden">
                <div className="absolute inset-0 bg-mint/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <FaGithub size={20} className="text-gray-400 group-hover:text-mint relative z-10" />
              </a>
              <a href="https://www.linkedin.com/in/ayoub-baidane-1b603131a/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/10 hover:border-mint hover:text-mint transition-all cursor-none group relative overflow-hidden">
                <div className="absolute inset-0 bg-mint/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <FaLinkedin size={20} className="text-gray-400 group-hover:text-mint relative z-10" />
              </a>
              <a href="mailto:ayoubbaidane06@gmail.com" className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border border-white/10 hover:border-mint hover:text-mint transition-all cursor-none group relative overflow-hidden">
                <div className="absolute inset-0 bg-mint/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <Mail size={20} className="text-gray-400 group-hover:text-mint relative z-10" />
              </a>
            </div>
            
            <div className="mt-4">
              <AnimatedButton variant="outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText size={18} /> Download Resume
              </AnimatedButton>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="bg-surface/50 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl">
            <form action="https://formspree.io/f/xreoplwa" method="POST" className="flex flex-col gap-6" suppressHydrationWarning>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-wider font-semibold text-mint">Name</label>
                <input 
                  suppressHydrationWarning
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mint focus:shadow-[0_0_10px_rgba(0,255,163,0.2)] transition-all w-full cursor-none selection:bg-mint selection:text-background"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-wider font-semibold text-mint">Email</label>
                <input 
                  suppressHydrationWarning
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  required
                  className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mint focus:shadow-[0_0_10px_rgba(0,255,163,0.2)] transition-all w-full cursor-none selection:bg-mint selection:text-background"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs uppercase tracking-wider font-semibold text-mint">Message</label>
                <textarea 
                  suppressHydrationWarning
                  name="message"
                  rows={4}
                  required
                  placeholder="Hello Ayoub, I'd like to discuss..."
                  className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-mint focus:shadow-[0_0_10px_rgba(0,255,163,0.2)] transition-all w-full resize-none cursor-none selection:bg-mint selection:text-background"
                ></textarea>
              </div>
              <AnimatedButton type="submit" variant="solid" className="w-full mt-2 hover:shadow-[0_0_30px_rgba(0,255,163,0.4)]">
                Send Message <Send size={18} />
              </AnimatedButton>
            </form>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ayoub Baidane. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="hover:text-mint transition-colors cursor-none">ayoubbaidane06@gmail.com</span>
            <span>•</span>
            <span className="hover:text-mint transition-colors cursor-none">baidaneayoub@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
