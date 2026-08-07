"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    opportunity: "Full-Time Role",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            LET&apos;S WORK<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#F46C38]">
              TOGETHER
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Info Column */}
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-[#998F8F] leading-relaxed">
              If you have an exciting research project, full-time Machine Learning opportunity, or simply want to connect, feel free to drop a message!
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1C1A19] border border-[#262422]">
                <Mail className="h-5 w-5 text-[#C5FF41]" />
                <div>
                  <div className="text-xs text-[#998F8F] font-semibold">Direct Email</div>
                  <a
                    href="mailto:sagnikchandra@gmail.com"
                    className="text-sm font-bold text-white hover:text-[#C5FF41] transition-colors"
                  >
                    sagnikchandra@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1C1A19] border border-[#262422]">
                <MapPin className="h-5 w-5 text-[#F46C38]" />
                <div>
                  <div className="text-xs text-[#998F8F] font-semibold">Location</div>
                  <div className="text-sm font-bold text-white">Kolkata, India (Open to Relocation & Remote)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (Sawad Form Style) */}
          <div className="sawad-card p-6 sm:p-8 space-y-6">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5FF41] mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-sm text-[#998F8F]">
                  Thank you for reaching out, Sagnik will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#998F8F] uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#151312] border border-[#262422] text-white text-sm focus:outline-none focus:border-[#C5FF41] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#998F8F] uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#151312] border border-[#262422] text-white text-sm focus:outline-none focus:border-[#C5FF41] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#998F8F] uppercase tracking-wider">
                    Opportunity / Inquiry
                  </label>
                  <select
                    value={formData.opportunity}
                    onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#151312] border border-[#262422] text-white text-sm focus:outline-none focus:border-[#C5FF41] transition-colors"
                  >
                    <option value="Full-Time Role">Full-Time ML & AI Role</option>
                    <option value="Data Engineering">Data Engineering Opportunity</option>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="General Inquiry">General Inquiry / Chat</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#998F8F] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#151312] border border-[#262422] text-white text-sm focus:outline-none focus:border-[#C5FF41] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C5FF41] text-[#151312] font-extrabold text-sm hover:bg-[#d6ff66] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,255,65,0.25)]"
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


