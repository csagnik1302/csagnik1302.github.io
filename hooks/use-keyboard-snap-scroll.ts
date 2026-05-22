'use client';

import { useEffect } from 'react';

export function useKeyboardSnapScroll() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', ' ', 'PageDown', 'PageUp'];
      
      if (!scrollKeys.includes(e.key)) return;

      e.preventDefault();

      const sections = document.querySelectorAll('section[id]');
      if (sections.length === 0) return;

      const scrollPositions = Array.from(sections).map(section => {
        const rect = section.getBoundingClientRect();
        return {
          id: section.id,
          top: window.scrollY + rect.top,
          element: section
        };
      });

      const currentScroll = window.scrollY;
      let targetSection: typeof scrollPositions[0] | null = null;

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        targetSection = scrollPositions.find(pos => pos.top > currentScroll + 10) || null;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const reversed = [...scrollPositions].reverse();
        targetSection = reversed.find(pos => pos.top < currentScroll - 10) || null;
      }

      if (targetSection) {
        targetSection.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
