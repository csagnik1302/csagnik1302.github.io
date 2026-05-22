"use client";

import { GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface Education {
  period: string;
  degree: string;
  institution: string;
}

const education: Education[] = [
  {
    period: "2025 — present",
    degree: "M.Sc. in Data Science and Artificial Intelligence",
    institution: "Ramakrishna Mission Vivekananda Educational & Research Institute, Belur",
  },
  {
    period: "2020 — 2023",
    degree: "B.Sc. (Hons) in Mathematics",
    institution: "University of Calcutta",
  },
  {
    period: "2018 — 2020",
    degree: "Higher Secondary (CBSE)",
    institution: "Kendriya Vidyalaya Cossipore",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-6 lg:px-0">
      <ScrollReveal className="max-w-4xl mx-auto">
        <SectionHeading icon={GraduationCap}>Education</SectionHeading>

        <div className="space-y-8">
          <div className="grid gap-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="space-y-2 border-l-2 border-border pl-6"
              >
                <p className="text-sm text-muted-foreground font-mono">
                  {edu.period}
                </p>
                <div>
                  <h4 className="text-foreground font-medium">{edu.degree}</h4>
                  <p className="text-primary text-sm">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
