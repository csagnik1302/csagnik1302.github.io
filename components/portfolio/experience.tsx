"use client";

import { BriefcaseBusiness, ExternalLink, ArrowUpRight, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  skills: string[];
  metrics?: string[];
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
    metrics: ["1-4 hrs/day saved", "~60% process efficiency", "30+ stakeholders"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-12">
        <SectionHeading icon={BriefcaseBusiness}>Professional Experience</SectionHeading>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="sawad-card p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {exp.role}
                    </h3>
                    <span className="text-[#A09D9A]">at</span>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#C5FF41] hover:underline font-bold"
                      >
                        {exp.company}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-[#C5FF41] font-bold">{exp.company}</span>
                    )}
                  </div>
                </div>

                <div className="sawad-pill shrink-0 self-start sm:self-auto">
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Impact Metrics Badges */}
              {exp.metrics && (
                <div className="flex flex-wrap gap-3">
                  {exp.metrics.map((m) => (
                    <span key={m} className="sawad-pill-orange text-xs">
                      <TrendingUp className="w-3 h-3" />
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-sm sm:text-base text-[#A09D9A] leading-relaxed">
                {exp.description}
              </p>

              {/* Skill Chips */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-[#A09D9A] mb-2.5">Tools & Tech Used</div>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-semibold text-white bg-white/[0.05] border border-white/10 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
