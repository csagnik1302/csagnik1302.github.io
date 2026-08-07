"use client";

import { GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
}

const education: EducationItem[] = [
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
    <section id="education" className="py-16 sm:py-20 px-6 lg:px-0 max-w-4xl mx-auto">
      <ScrollReveal className="space-y-8">
        <SectionHeading icon={GraduationCap}>Education</SectionHeading>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="space-y-1.5 border-l-2 border-[#262422] pl-6 transition-colors hover:border-[#C5FF41]"
            >
              <p className="text-xs font-semibold text-[#998F8F]">
                {edu.period}
              </p>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">{edu.degree}</h4>
                <p className="text-[#C5FF41] text-sm font-semibold mt-0.5">{edu.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

