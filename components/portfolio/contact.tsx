"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, MapPin, Copy, Check, Github, Linkedin, ExternalLink, Download } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

const RESUME_URL = "https://drive.google.com/file/d/1rhio97CGMhq9xvoXZJAp88HLMmLWJHsi/view?usp=sharing";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    opportunity: "Full-Time ML Role",
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
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <span className="text-xs font-mono font-bold text-[#C5FF41] uppercase tracking-widest">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
            LET'S WORK{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#38BDF8]">
              TOGETHER
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Direct Info & Copy Button */}
          <div className="space-y-6">
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Open for full-time Machine Learning, AI Research, and Data Engineering roles. Whether you have an exciting research project, job opportunity, or want to collaborate on LLM retrieval pipelines, reach out directly!
            </p>

            <div className="space-y-4">
              {/* Direct Email Card with Copy Action */}
              <div className="bento-card p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C5FF41]/10 border border-[#C5FF41]/30 flex items-center justify-center text-[#C5FF41]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#94A3B8] font-mono uppercase font-bold">Direct Email</div>
                    <div className="text-sm font-bold text-white font-mono">sagnikchandra@gmail.com</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-xl bg-[#1E293B] hover:bg-[#C5FF41] hover:text-[#0B0F17] border border-white/10 text-xs font-mono font-bold text-white transition-all flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="bento-card p-4 sm:p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-[#94A3B8] font-mono uppercase font-bold">Location</div>
                  <div className="text-sm font-bold text-white">Kolkata, India (Open to Remote & Relocation)</div>
                </div>
              </div>

              {/* Download Resume Link Card */}
              <div className="bento-card p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#94A3B8] font-mono uppercase font-bold">Official Document</div>
                    <div className="text-sm font-bold text-white">Resume & Experience PDF</div>
                  </div>
                </div>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#C5FF41] text-[#0B0F17] text-xs font-mono font-bold hover:bg-[#d6ff66] transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Open PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bento-card p-6 sm:p-8 space-y-6">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5FF41] mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-[#94A3B8]">
                  Thank you for reaching out. Sagnik will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5FF41] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5FF41] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase font-bold">Inquiry Type</label>
                  <select
                    value={formData.opportunity}
                    onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5FF41] transition-colors"
                  >
                    <option value="Full-Time ML Role">Full-Time ML / AI Engineer Role</option>
                    <option value="Data Engineering">Data Engineering Opportunity</option>
                    <option value="Research Collaboration">Research Collaboration (LLM / RAG)</option>
                    <option value="General Inquiry">General Inquiry / Connect</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] uppercase font-bold">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your team, project, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C5FF41] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C5FF41] text-[#0B0F17] font-black text-xs hover:bg-[#d6ff66] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,255,65,0.25)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
