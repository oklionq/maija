"use client";

import { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  opacity?: number;
}

export default function MatrixBackground({ opacity = 1 }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops only once
    if (dropsRef.current.length === 0) {
      dropsRef.current = Array(columns).fill(0).map(() => Math.floor(Math.random() * canvas.height / fontSize));
    }

    const draw = () => {
      // Create trail effect with semi-transparent black
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters in neon pink
      ctx.fillStyle = "#ff3377";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        // Move drop down
        dropsRef.current[i]++;
      }

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recalculate columns on resize
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns !== dropsRef.current.length) {
        dropsRef.current = Array(newColumns).fill(0).map(() => Math.floor(Math.random() * canvas.height / fontSize));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Only run once on mount

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-[1500ms]"
      style={{ opacity, zIndex: 0 }}
    />
  );
}
