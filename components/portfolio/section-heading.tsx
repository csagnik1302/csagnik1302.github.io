import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  icon: LucideIcon;
  children: string;
}

export function SectionHeading({ icon: Icon, children }: SectionHeadingProps) {
  return (
    <h2 className="mb-10 flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-white">
      <Icon className="h-4 w-4 text-[#C5FF41]" aria-hidden="true" />
      <span>{children}</span>
    </h2>
  );
}

