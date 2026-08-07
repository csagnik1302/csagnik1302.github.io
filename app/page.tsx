"use client";

import { useState } from "react";
import { FluidBackground } from "@/components/portfolio/fluid-background";
import { FastfolioHero } from "@/components/portfolio/fastfolio-hero";
import { AIResponseModal, ModalContent } from "@/components/portfolio/ai-response-modal";

export default function Home() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  return (
    <main className="relative min-h-screen bg-[#0B0D12] overflow-hidden">
      <FluidBackground />
      <FastfolioHero onOpenModal={(content) => setModalContent(content)} />
      <AIResponseModal content={modalContent} onClose={() => setModalContent(null)} />
    </main>
  );
}
