import type { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  icon: LucideIcon;
  children: string;
}

export function SectionHeading({ icon: Icon, children }: SectionHeadingProps) {
  return (
    <h2 className="mb-12 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      {children}
    </h2>
  );
}
