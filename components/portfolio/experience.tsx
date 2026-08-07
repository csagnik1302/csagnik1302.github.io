"use client";

import { BriefcaseBusiness, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

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
    skills: ["Hubspot", "Zoho CRM", "Zoho Flow", "Google Sheets", "Python", "Gemini AI"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-6 lg:px-0 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        <SectionHeading icon={BriefcaseBusiness}>Experience</SectionHeading>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group grid lg:grid-cols-[160px_1fr] gap-4 lg:gap-8 items-start"
            >
              <div className="text-xs font-semibold text-[#998F8F] tracking-wide pt-1">
                {exp.period}
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg group-hover:text-[#C5FF41] transition-colors">
                  {exp.role} ·{" "}
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#C5FF41] hover:underline"
                    >
                      {exp.company}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-[#C5FF41]">{exp.company}</span>
                  )}
                </h3>

                <p className="text-[#998F8F] text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-semibold text-[#C5FF41] bg-[#C5FF41]/10 border border-[#C5FF41]/20 rounded-md"
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

