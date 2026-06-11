'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, HelpCircle } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm a quick-info assistant. Ask me about Youssef's skills, projects, or background!" },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Cancel a pending scripted reply if the widget unmounts
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    const lower = input.toLowerCase();
    setInput('');

    replyTimeoutRef.current = setTimeout(() => {
      let reply = "I'm not sure about that one — check the resume in the contact section, or reach Youssef directly at youssefbouzine05@gmail.com.";
      if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('sentinel'))
        reply = "Youssef has 4 projects: Project Sentinel (smart security turnstile with facial recognition — 2nd place at the 2026 National Robotics Competition), BDIA Academic Portal (Node.js, MySQL, Docker — live demo available), an AI Agent using n8n & Llama 3 for email automation, and an ETL pipeline for the Top 10 global banks.";
      else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack'))
        reply = "Core stack: Python (Pandas, NumPy, Scikit-learn), ETL pipelines, REST APIs, n8n, Docker, SQL/PostgreSQL/SQLite. Data visualization with Power BI and Matplotlib.";
      else if (lower.includes('education') || lower.includes('school') || lower.includes('degree'))
        reply = "Studying Cycle Ingénieur in Big Data & AI at ENSATÉ (2025–2028). IBM Data Engineering Certificate (6 modules) and DeepLearning.AI ML Specialization in progress.";
      else if (lower.includes('contact') || lower.includes('hire') || lower.includes('intern') || lower.includes('stage'))
        reply = "Youssef is actively seeking an internship! Use the contact form at the bottom, or connect on LinkedIn: linkedin.com/in/youssef-bouzine-128179349.";
      else if (/\b(hi|hello|hey|bonjour|salut)\b/.test(lower))
        reply = "Hello! How can I help you learn more about Youssef Bouzine?";
      else if (lower.includes('location') || lower.includes('where') || lower.includes('based'))
        reply = "Youssef is based in Rabat, Morocco, open to national and remote positions.";
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
    }, 900);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3">
        {!isOpen && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex bg-white/[0.06] backdrop-blur-md border border-white/10
              px-4 py-2 rounded-full items-center gap-2 shadow-lg">
            <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            <span className="text-sm font-medium text-white/60">Quick Info</span>
          </motion.div>
        )}
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close info bot' : 'Open info bot'}
          className="w-14 h-14 bg-white/[0.08] backdrop-blur-md rounded-full flex items-center justify-center
            text-white/70 border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]
            hover:bg-white/[0.14] hover:text-white transition-all">
          {isOpen ? <X size={22} /> : <HelpCircle size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[340px] max-w-[calc(100vw-48px)] h-[480px] max-h-[calc(100dvh-130px)]
              bg-[#0a0a0c]/80 backdrop-blur-xl rounded-2xl border border-white/10
              shadow-[0_16px_64px_rgba(0,0,0,0.6)] z-[100] flex flex-col overflow-hidden">

            <div className="px-4 py-3.5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-9 h-9 bg-white/[0.07] rounded-full flex items-center justify-center text-white/60">
                <HelpCircle size={18} />
              </div>
              <div>
                <h3 className="text-white/80 font-bold text-sm">Portfolio Info</h3>
                <p className="text-white/25 text-xs">Scripted FAQ — not an AI</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" aria-live="polite">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white/[0.12] text-white/90 rounded-tr-sm border border-white/10'
                      : 'bg-white/[0.05] text-white/60 border border-white/[0.06] rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/[0.06]">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="w-full bg-white/[0.06] border border-white/10 rounded-full py-2.5 pl-4 pr-11
                    text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-white/25 transition-colors" />
                <button type="submit" disabled={!input.trim()} aria-label="Send"
                  className="absolute right-2 w-7 h-7 flex items-center justify-center text-white/60
                    bg-white/[0.08] rounded-full hover:bg-white/20 hover:text-white transition-all disabled:opacity-25">
                  <Send size={13} className="ml-[-1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
