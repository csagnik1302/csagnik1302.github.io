"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    skills: ["Hubspot", "Zoho CRM", "Zoho Flow", "Google Sheets", "Python", "Gemini"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6 lg:px-0">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-12 font-medium">
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ScrollReveal
              key={index}
              className="group grid lg:grid-cols-[150px_1fr] gap-4 lg:gap-8"
              delay={index * 150}
            >
              <div className="text-sm text-muted-foreground font-mono">
                {exp.period}
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {exp.role} ·{" "}
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {exp.company}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-primary">{exp.company}</span>
                    )}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
