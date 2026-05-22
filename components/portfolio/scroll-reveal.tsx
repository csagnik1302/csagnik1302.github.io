"use client";

import type { HTMLAttributes } from "react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  style,
  ...props
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimate<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      className={cn("scroll-reveal", className)}
      style={{
        ...style,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
