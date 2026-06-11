'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  CodeXml,
  Users,
  AtSign,
  Earth,
  BrainCircuit,
  Database,
  Container,
  Bot,
} from "lucide-react";

type Currently = {
  emoji: string;
  context: string;
  value: string;
};

type Approach = {
  title: string;
  body: string;
};

type SkillPill = {
  label: string;
  icon: LucideIcon;
};

type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
};

const approaches: Approach[] = [
  {
    title: "Data before everything",
    body: "Every project starts with understanding the data — its shape, gaps, and story — before writing a single line of model code.",
  },
  {
    title: "Ship, then refine",
    body: "A working pipeline that runs is worth more than a perfect one that doesn't. I iterate fast and improve from real feedback.",
  },
  {
    title: "End-to-end ownership",
    body: "From raw data ingestion to containerised deployment — I don't hand off at the model. I see it through to production.",
  },
];

const skills: SkillPill[] = [
  { label: "Machine Learning", icon: BrainCircuit },
  { label: "ETL Pipelines", icon: Database },
  { label: "Docker & DevOps", icon: Container },
  { label: "AI Agents (n8n)", icon: Bot },
  { label: "Python & Pandas", icon: CodeXml },
  { label: "SQL & NoSQL", icon: Database },
];

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    handle: "Youssef Bouzine",
    href: "https://www.linkedin.com/in/youssef-bouzine/",
    icon: Users,
  },
  {
    label: "GitHub",
    handle: "youssefbouzine20",
    href: "https://github.com/youssefbouzine20",
    icon: CodeXml,
  },
  {
    label: "Email",
    handle: "youssefbouzine05@gmail.com",
    href: "mailto:youssefbouzine05@gmail.com",
    icon: AtSign,
  },
];


export function GlassmorphismPortfolioBlock() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-24 lg:py-32" style={{ isolation: 'isolate' }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-2xl md:p-12"
          style={{ boxShadow: '0 0 80px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {/* Glass gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />

          <div className="relative grid gap-14 lg:grid-cols-2">

            {/* ── Left — Stats + Skills ── */}
            <div className="space-y-10">
              <div>
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-full border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/40 backdrop-blur"
                >
                  At a Glance
                </Badge>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-5 text-2xl font-semibold tracking-tight text-white/85 md:text-3xl"
                >
                  How I work
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 text-sm leading-relaxed text-white/40"
                >
                  The principles that guide every project I build.
                </motion.p>
              </div>

              {/* Approach cards */}
              <div className="flex flex-col gap-3">
                {approaches.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
                  >
                    <p className="text-xs font-semibold text-white/75 mb-1">{item.title}</p>
                    <p className="text-sm leading-relaxed text-white/35 font-light">{item.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/25">
                  Core Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <motion.span
                        key={skill.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-white/50"
                      >
                        <Icon className="h-3 w-3" />
                        {skill.label}
                      </motion.span>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  size="lg"
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="h-11 gap-2 rounded-full px-7 text-sm uppercase tracking-[0.18em]"
                >
                  Download CV
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open("https://bdia-major-nxbe.vercel.app/", "_blank")}
                  className="h-11 gap-2 rounded-full px-7 text-sm uppercase tracking-[0.18em]"
                >
                  Live Project
                </Button>
              </motion.div>
            </div>

            {/* ── Right — Social links ── */}
            <div className="relative flex flex-col justify-center">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent blur-3xl" />
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl">

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/25">
                  Connect
                </p>
                <h3 className="mb-6 text-xl font-semibold text-white/80">
                  Find me online
                </h3>

                <div className="flex flex-col gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3.5 text-left
                          transition-[transform,border-color,background-color,box-shadow] duration-200
                          hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.07] hover:shadow-lg"
                        style={{ willChange: 'transform' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-white/55">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white/75">{social.label}</p>
                            <p className="text-xs text-white/30">{social.handle}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-white/20 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/55" />
                      </a>
                    );
                  })}
                </div>

                {/* Availability badge */}
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  <p className="text-xs text-white/40">
                    Open to internship opportunities — <span className="text-white/65 font-medium">Morocco &amp; abroad</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
