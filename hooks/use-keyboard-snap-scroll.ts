'use client';

import { useEffect } from 'react';

export function useKeyboardSnapScroll() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '];
      
      if (!scrollKeys.includes(e.key)) return;

      const sections = document.querySelectorAll('section[id]');
      if (sections.length === 0) return;

      e.preventDefault();

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

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        // Find next section below current scroll position
        targetSection = scrollPositions.find(pos => pos.top > currentScroll + 100) || null;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        // Find previous section above current scroll position
        const reversed = [...scrollPositions].reverse();
        targetSection = reversed.find(pos => pos.top < currentScroll - 100) || null;
      }

      if (targetSection) {
        targetSection.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
