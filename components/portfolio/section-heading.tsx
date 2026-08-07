import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  icon: LucideIcon;
  children: string;
}

export function SectionHeading({ icon: Icon, children }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C5FF41]/10 border border-[#C5FF41]/30 text-[#C5FF41] shadow-[0_0_12px_rgba(197,255,65,0.2)]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
        {children}
      </h2>
    </div>
  );
}
