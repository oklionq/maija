"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  opacity?: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
  layer: number;
  brightness: number;
  color: string;
  twinkleSpeed: number;
}

export default function Starfield({ opacity = 1 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize stars only once with 3 layers
    if (starsRef.current.length === 0) {
      const colors = ['rgba(255, 255, 255, 1)', 'rgba(255, 220, 227, 1)'];

      // Layer 1: Background - tiny, slow stars (150 stars)
      for (let i = 0; i < 150; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.8 + 0.5,
          speed: Math.random() * 0.05 + 0.02,
          layer: 1,
          brightness: Math.random() * 0.4 + 0.6, // Increased brightness
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.002 + 0.001,
        });
      }

      // Layer 2: Middle - medium stars with twinkle (100 stars)
      for (let i = 0; i < 100; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.5 + 1.2,
          speed: Math.random() * 0.15 + 0.08,
          layer: 2,
          brightness: Math.random() * 0.3 + 0.7, // Increased brightness
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.01 + 0.005,
        });
      }

      // Layer 3: Foreground - larger, faster stars (80 stars)
      for (let i = 0; i < 80; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.8 + 2,
          speed: Math.random() * 0.3 + 0.15,
          layer: 3,
          brightness: Math.random() * 0.2 + 0.8, // Maximum brightness
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: Math.random() * 0.015 + 0.008,
        });
      }

      console.log('Starfield initialized with', starsRef.current.length, 'stars');
    }

    const draw = () => {
      // Pure black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with proper brightness and twinkle
      starsRef.current.forEach((star) => {
        // Twinkle effect
        if (Math.random() < 0.02) {
          star.brightness += (Math.random() - 0.5) * star.twinkleSpeed * 10;
          star.brightness = Math.max(0.3, Math.min(1, star.brightness));
        } else {
          star.brightness += (0.7 - star.brightness) * 0.01;
        }

        const alpha = star.brightness;
        const colorWithAlpha = star.color.replace('1)', `${alpha})`);

        // Draw glow for larger stars
        if (star.layer >= 2) {
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          );
          glowGradient.addColorStop(0, colorWithAlpha);
          glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha;
        ctx.fill();

        // Move star
        star.x += star.speed * 0.5;
        star.y -= star.speed * 0.2;

        if (star.x > canvas.width) {
          star.x = 0;
          star.y = Math.random() * canvas.height;
        }
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      // No FPS cap - scales to monitor refresh rate (120Hz/144Hz)
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-[1500ms]"
      style={{ opacity, zIndex: 1 }}
    />
  );
}
