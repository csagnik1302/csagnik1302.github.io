"use client";

import { useState } from "react";
import { FluidBackground } from "@/components/portfolio/fluid-background";
import { FastfolioHero } from "@/components/portfolio/fastfolio-hero";
import { ChatView } from "@/components/portfolio/chat-view";

export default function Home() {
  const [activeChat, setActiveChat] = useState<{
    type: "me" | "projects" | "experience" | "skills" | "education" | "contact" | "custom";
    query?: string;
  } | null>(null);

  return (
    <main className="relative min-h-screen bg-[#0B0D12] text-slate-100 overflow-x-hidden">
      <FluidBackground />

      {!activeChat ? (
        <FastfolioHero
          onStartChat={(type, query) => setActiveChat({ type, query })}
        />
      ) : (
        <ChatView
          initialPrompt={activeChat}
          onBackToHome={() => setActiveChat(null)}
        />
      )}
    </main>
  );
}
