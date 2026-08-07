"use client";

import { Mail, MapPin, Send, ArrowUpRight, Sparkles, CheckCircle2, Globe2 } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-12">
        <SectionHeading icon={Mail}>Get In Touch</SectionHeading>

        {/* Hero CTA Box */}
        <div className="sawad-card p-8 sm:p-12 relative overflow-hidden space-y-8 bg-gradient-to-br from-[#161515] via-[#1A1818] to-[#121111]">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5FF41]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F46C38]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 space-y-6 max-w-2xl">
            <div className="sawad-pill">
              <Sparkles className="w-3 h-3 text-[#C5FF41]" />
              <span>Let&apos;s Connect</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#F46C38]">extraordinary</span> together.
            </h3>

            <p className="text-base sm:text-lg text-[#A09D9A] leading-relaxed">
              If you have an exciting research project, full-time ML engineering opportunity, or simply want to connect, feel free to reach out anytime!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:sagnikchandra@gmail.com"
                className="sawad-btn-lime group text-base px-6 py-3.5"
              >
                <Mail className="w-5 h-5" />
                <span>sagnikchandra@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Status & Availability Strip */}
          <div className="relative z-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#C5FF41] animate-pulse shadow-[0_0_10px_#C5FF41]" />
              <div className="text-xs font-semibold text-white">Full-time ML & Data Roles</div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <Globe2 className="w-4 h-4 text-[#F46C38]" />
              <div className="text-xs font-semibold text-white">Open to Relocation</div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <MapPin className="w-4 h-4 text-[#38BDF8]" />
              <div className="text-xs font-semibold text-white">Kolkata, India (Remote-Ready)</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
