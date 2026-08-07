"use client";

import { BriefcaseBusiness, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: "Oct 2024 — Jul 2025",
    role: "Data Science Intern",
    company: "DeepThought CultureTech Ventures",
    companyUrl: "https://www.deepthought.education/",
    description:
      "Led and contributed to 10+ cross-functional initiatives across AI workflow automation, CRM optimization, data operations, recruitment, UX research, and business growth. Built AI-powered workflows and internal AI wrappers that reduced manual effort by 1–4 hours daily, redesigned CRM and tracking systems that improved process efficiency by ~60%, increased team coordination by ~90%, and reduced operational turnaround time from 3 days to 1 day. Supported decision-making through centralized dashboards, KPI-based tracking, and process automation impacting 30+ internal stakeholders and 20+ external users/business contacts.",
    skills: ["Python", "Gemini AI", "Zoho Flow", "Zoho CRM", "Hubspot", "Data Automation"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <ScrollReveal className="space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-[#C5FF41] uppercase tracking-widest">
            WORK HISTORY
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none">
            PROFESSIONAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5FF41] to-[#F46C38]">
              EXPERIENCE
            </span>
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="sawad-card p-6 sm:p-8 space-y-6 hover:border-[#C5FF41]/40 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262422] pb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#C5FF41] transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-bold text-[#F46C38] mt-1">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {exp.company}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span>{exp.company}</span>
                    )}
                  </div>
                </div>

                <div className="sawad-badge self-start sm:self-auto shrink-0">
                  {exp.period}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#998F8F] leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-bold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-full uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}


