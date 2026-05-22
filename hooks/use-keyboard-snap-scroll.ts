'use client';

import { useEffect } from 'react';

export function useKeyboardSnapScroll() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'];
      
      if (!scrollKeys.includes(e.key)) return;

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

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        targetSection = scrollPositions.find(pos => pos.top > currentScroll + 50) || null;
        if (!targetSection && scrollPositions.length > 0) {
          targetSection = scrollPositions[scrollPositions.length - 1];
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const reversed = [...scrollPositions].reverse();
        targetSection = reversed.find(pos => pos.top < currentScroll - 50) || null;
        if (!targetSection && scrollPositions.length > 0) {
          targetSection = scrollPositions[0];
        }
      }

      if (targetSection) {
        e.preventDefault();
        targetSection.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
