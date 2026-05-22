"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function PortfolioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const pointer = { x: 0, y: 0, active: false };
    let points: Point[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const createPoints = () => {
      const density = width < 768 ? 9500 : 7200;
      const count = Math.min(96, Math.max(34, Math.floor((width * height) / density)));

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createPoints();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(112, 241, 220, 0.42)");
      gradient.addColorStop(1, "rgba(130, 176, 255, 0.26)");

      points.forEach((point) => {
        if (!prefersReducedMotion) {
          point.x += point.vx;
          point.y += point.vy;
        }

        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;

        if (pointer.active) {
          const dx = pointer.x - point.x;
          const dy = pointer.y - point.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 150 && distance > 0) {
            point.x -= (dx / distance) * 0.22;
            point.y -= (dy / distance) * 0.22;
          }
        }
      });

      for (let index = 0; index < points.length; index += 1) {
        const current = points[index];

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const next = points[nextIndex];
          const distance = Math.hypot(current.x - next.x, current.y - next.y);

          if (distance < 142) {
            context.strokeStyle = `rgba(112, 241, 220, ${(1 - distance / 142) * 0.18})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(current.x, current.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(current.x, current.y, 1.35, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const setPointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", setPointer);
    window.addEventListener("pointerdown", setPointer);
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerdown", setPointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <div className="portfolio-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
