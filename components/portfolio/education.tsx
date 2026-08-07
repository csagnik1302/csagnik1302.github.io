"use client";

import { GraduationCap, Award, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/portfolio/scroll-reveal";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  badge?: string;
}

const education: EducationItem[] = [
  {
    period: "2025 — Present",
    degree: "M.Sc. in Data Science and Artificial Intelligence",
    institution: "Ramakrishna Mission Vivekananda Educational & Research Institute, Belur",
    badge: "Master's Degree",
  },
  {
    period: "2020 — 2023",
    degree: "B.Sc. (Hons) in Mathematics",
    institution: "University of Calcutta",
    badge: "Bachelor's Degree",
  },
  {
    period: "2018 — 2020",
    degree: "Higher Secondary (CBSE)",
    institution: "Kendriya Vidyalaya Cossipore",
    badge: "Schooling",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <ScrollReveal className="space-y-12">
        <SectionHeading icon={GraduationCap}>Education & Credentials</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div key={index} className="sawad-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="sawad-pill text-[11px]">
                    {edu.period}
                  </span>
                  {edu.badge && (
                    <span className="text-[10px] uppercase font-bold text-[#F46C38] tracking-wider">
                      {edu.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-extrabold text-white leading-snug">
                  {edu.degree}
                </h3>
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-xs font-semibold text-[#A09D9A]">
                  {edu.institution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
