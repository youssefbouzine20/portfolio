'use client';
import { useState } from 'react';
import { Mail, Send, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import AnimatedButton from '../ui/AnimatedButton';

export default function ContactFooter() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xreoplwa', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <footer id="contact" className="w-full pt-28 pb-8 px-6 relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="text-white/25 font-semibold uppercase tracking-widest text-xs">Contact</span>
            <h2 className="text-5xl md:text-6xl font-black text-white/90 leading-tight">
              Let&apos;s build something{' '}<br />
              <span className="italic font-light text-white/40">great together.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-md font-light leading-relaxed">
              Whether you have an internship opportunity, a data project to collaborate on, or just want
              to talk about AI agents and pipelines — I&apos;m all ears.
            </p>

            <div className="flex gap-3 mt-6">
              {[
                { href: 'https://github.com/youssefbouzine20', icon: <FaGithub size={18} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/youssef-bouzine-128179349/', icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
                { href: 'mailto:youssefbouzine05@gmail.com', icon: <Mail size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noreferrer' : undefined} aria-label={label}
                  className="w-11 h-11 bg-white/[0.05] backdrop-blur-sm rounded-full flex items-center justify-center
                    border border-white/10 text-white/40 hover:text-white hover:bg-white/[0.12] hover:border-white/25
                    transition-all duration-200">
                  {icon}
                </a>
              ))}
            </div>

            <div className="mt-2">
              <AnimatedButton variant="outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText size={16} /> Download Resume
              </AnimatedButton>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white/[0.04] backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/[0.08] shadow-[0_8px_48px_rgba(0,0,0,0.3)]">

            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-400" strokeWidth={1.5} />
                <h3 className="text-white/80 font-bold text-lg">Message sent!</h3>
                <p className="text-white/40 text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-xs text-white/30 hover:text-white/60 transition-colors border border-white/10 px-4 py-2 rounded-full"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot — hidden from humans, catches spam bots (Formspree convention) */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off"
                  className="hidden" aria-hidden="true" />
                {['Name', 'Email'].map((field) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label htmlFor={`contact-${field.toLowerCase()}`}
                      className="text-xs font-semibold uppercase tracking-wider text-white/40">{field}</label>
                    <input
                      id={`contact-${field.toLowerCase()}`}
                      type={field === 'Email' ? 'email' : 'text'}
                      name={field.toLowerCase()}
                      placeholder={field === 'Email' ? 'jane@example.com' : 'Jane Smith'}
                      required
                      disabled={formState === 'sending'}
                      className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white
                        placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors w-full text-sm
                        disabled:opacity-50"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wider text-white/40">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    disabled={formState === 'sending'}
                    placeholder="Hi, I'd like to discuss..."
                    className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white
                      placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors w-full resize-none text-sm
                      disabled:opacity-50"
                  />
                </div>

                {formState === 'error' && (
                  <div className="flex items-center gap-2 text-red-400/80 text-xs bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3">
                    <AlertCircle size={14} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <AnimatedButton
                  type="submit"
                  variant="solid"
                  className={`w-full mt-1 ${formState === 'sending' ? 'opacity-60 pointer-events-none' : ''}`}
                >
                  {formState === 'sending' ? 'Sending…' : <><Send size={15} /> Send Message</>}
                </AnimatedButton>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.06] text-xs text-white/20">
          <p>© {new Date().getFullYear()} Youssef Bouzine. All rights reserved.</p>
          <a href="mailto:youssefbouzine05@gmail.com"
            className="hover:text-white/50 transition-colors mt-3 md:mt-0">youssefbouzine05@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
