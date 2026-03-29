'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi, I'm Ayoub's AI assistant. Ask me anything about his skills or projects!" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      let reply = "I'm still learning about Ayoub's full background, but I know he's an expert in Data Engineering and Full-Stack Dev! Check out his resume for more details.";
      
      const lowerInput = currentInput.toLowerCase();
      if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work')) {
        reply = "Ayoub has built some amazing projects, including a Real-Time Data Pipeline using Kafka and Spark, and a Full-Stack academic platform for ENSA Tétouan.";
      } else if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack') || lowerInput.includes('language')) {
        reply = "His primary stack includes Python, Kafka, Spark, Node.js, and React. He's very comfortable building both ML models and scalable web apps.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('email') || lowerInput.includes('reach')) {
        reply = "You can reach him at ayoubbaidane06@gmail.com, or use the contact form at the bottom of the page!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi ')) {
        reply = "Hello there! How can I help you learn more about Ayoub?";
      }

      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] cursor-none flex items-center gap-4">
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex bg-surface border border-white/10 px-4 py-2 rounded-full shadow-lg items-center gap-2"
          >
            <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Chat with AI</span>
          </motion.div>
        )}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-mint rounded-full flex items-center justify-center text-background shadow-[0_0_20px_rgba(0,255,163,0.4)] cursor-none transition-transform"
        >
          {isOpen ? <X size={24} /> : <Bot size={26} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-48px)] h-[500px] bg-surface rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden border border-mint/20"
          >
            {/* Header */}
            <div className="bg-[#0a0f1c] p-4 border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center text-mint">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Ayoub's AI</h3>
                <p className="text-mint text-xs flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0f172a] scr-chat">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} cursor-none`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-mint text-background rounded-tr-sm' 
                      : 'bg-surface border border-white/5 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0a0f1c] border-t border-white/5">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..." 
                  className="w-full bg-[#0f172a] border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-mint/50 transition-colors cursor-none placeholder:text-gray-500"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center text-mint bg-mint/10 rounded-full hover:bg-mint hover:text-background transition-colors disabled:opacity-50 cursor-none"
                >
                  <Send size={14} className="ml-[-2px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
