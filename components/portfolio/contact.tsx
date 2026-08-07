"use client";

import { useState } from "react";
import { Mail, Send, Copy, Check, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sagnikchandra@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        {/* Section Header */}
        <div className="border-b border-white/10 pb-4 space-y-1">
          <span className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
            Contact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Info Card */}
          <div className="framer-card p-6 space-y-4">
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              If you want to collaborate on LLM pipelines, discuss Machine Learning opportunities, or simply connect, feel free to drop a message!
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#1C1E24] border border-white/5">
                <div className="text-xs font-mono text-white">sagnikchandra@gmail.com</div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-[#262930] hover:bg-white hover:text-black text-xs font-mono font-semibold text-white transition-all flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#1C1E24] border border-white/5 hover:border-white/20 transition-all text-xs font-mono text-slate-300"
              >
                <span>View Official Resume PDF</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="framer-card p-6 space-y-4">
            {submitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="text-emerald-400 font-semibold text-sm">Message Sent!</div>
                <p className="text-xs text-[#9CA3AF]">
                  Thank you for reaching out. Sagnik will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-[#9CA3AF]">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C1E24] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3AF]">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C1E24] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3AF]">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C1E24] border border-white/10 text-white text-xs focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-white text-[#0E0F12] font-semibold text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
