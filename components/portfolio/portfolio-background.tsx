"use client";

import { useEffect, useRef } from "react";

interface Point {
  phase: number;
  speed: number;
  amplitude: number;
  offset: number;
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
    let bands: Point[] = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;

    const createBands = () => {
      const count = width < 768 ? 12 : 18;

      bands = Array.from({ length: count }, (_, index) => ({
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.004,
        amplitude: 18 + Math.random() * 34,
        offset: ((index + 0.5) / count) * height,
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
      createBands();
    };

    const getDisplacedY = (x: number, band: Point) => {
      const wave =
        Math.sin(x * 0.008 + band.phase + time * band.speed) * band.amplitude +
        Math.sin(x * 0.003 + band.phase * 1.7 - time * band.speed * 0.7) *
          band.amplitude *
          0.46;

      if (!pointer.active) return band.offset + wave;

      const dx = x - pointer.x;
      const distance = Math.abs(dx);
      const influence = Math.max(0, 1 - distance / 260);
      const verticalPull = (pointer.y - band.offset) * influence * 0.16;

      return band.offset + wave + verticalPull;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      time += prefersReducedMotion ? 0 : 1;

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(112, 241, 220, 0.22)");
      gradient.addColorStop(0.52, "rgba(132, 200, 255, 0.2)");
      gradient.addColorStop(1, "rgba(112, 241, 220, 0.08)");

      context.lineCap = "round";
      context.lineJoin = "round";

      bands.forEach((band, index) => {
        context.beginPath();

        for (let x = -80; x <= width + 80; x += 28) {
          const y = getDisplacedY(x, band);

          if (x === -80) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.strokeStyle = gradient;
        context.globalAlpha = 0.1 + (index % 4) * 0.035;
        context.lineWidth = index % 5 === 0 ? 1.6 : 0.9;
        context.stroke();

        if (index % 4 === 0) {
          context.globalAlpha = 0.08;
          context.lineWidth = 6;
          context.stroke();
        }
      });

      const columns = width < 768 ? 34 : 52;
      for (let index = 0; index < columns; index += 1) {
        const x = (index / columns) * width;
        const pulse = Math.sin(time * 0.018 + index * 0.8);
        const barHeight = 18 + Math.max(0, pulse) * 74;
        const y = height - 36 - ((index * 37) % Math.max(180, height * 0.52));

        context.globalAlpha = 0.045 + Math.max(0, pulse) * 0.055;
        context.fillStyle = index % 3 === 0 ? "rgb(112 241 220)" : "rgb(132 200 255)";
        context.fillRect(x, y, 1, barHeight);
      }

      if (pointer.active) {
        const radius = 180 + Math.sin(time * 0.03) * 12;
        const cursorGradient = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          radius
        );

        cursorGradient.addColorStop(0, "rgba(112, 241, 220, 0.16)");
        cursorGradient.addColorStop(0.5, "rgba(132, 200, 255, 0.08)");
        cursorGradient.addColorStop(1, "rgba(112, 241, 220, 0)");

        context.globalAlpha = 1;
        context.fillStyle = cursorGradient;
        context.beginPath();
        context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;

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
