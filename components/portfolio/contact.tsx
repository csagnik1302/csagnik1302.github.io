"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 px-6 lg:px-0 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        <SectionHeading icon={Mail}>Contact</SectionHeading>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
              If you would like to discuss a project or just say hi, I&apos;m always down to chat.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-[#998F8F] text-sm">
                <Mail className="h-4 w-4 text-[#C5FF41]" />
                <a
                  href="mailto:sagnikchandra@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  sagnikchandra@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#998F8F] text-sm">
                <MapPin className="h-4 w-4 text-[#C5FF41]" />
                <span>Kolkata, India</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:sagnikchandra@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C5FF41] text-[#151312] font-bold text-sm hover:bg-[#d6ff66] transition-colors shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#1C1A19] border border-[#262422] space-y-4">
            <h3 className="text-white font-bold text-base">Open for Opportunities</h3>
            <p className="text-[#998F8F] text-sm leading-relaxed">
              I&apos;m actively looking for full-time roles in ML engineering, data engineering, or applied AI research.
            </p>
            <div className="pt-2 space-y-2 text-xs font-semibold text-[#998F8F]">
              <p className="flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-[#C5FF41] animate-pulse" />
                Available for full-time roles
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C5FF41]" />
                Open to relocation
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C5FF41]" />
                Remote-friendly
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

