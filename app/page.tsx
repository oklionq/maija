"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import Starfield from "@/components/Starfield";
import BootLoader from "@/components/BootLoader";
import Countdown from "@/components/Countdown";
import NeonReveal from "@/components/NeonReveal";
import BirthdayBook from "@/components/BirthdayBook";
import PhotoHeart from "@/components/PhotoHeart";
import OrientationLock from "@/components/OrientationLock";

type Phase = "loading" | "countdown" | "reveal" | "book" | "heart";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [matrixOpacity, setMatrixOpacity] = useState(1);
  const [starfieldOpacity, setStarfieldOpacity] = useState(0);

  useEffect(() => {
    if (phase === "reveal") {
      setTimeout(() => setMatrixOpacity(0.3), 500);
    }
    if (phase === "book") {
      // Fade out Matrix Rain over 1.5 seconds
      setMatrixOpacity(0);
      // Fade in Starfield simultaneously
      setStarfieldOpacity(1);
    }
    if (phase === "heart") {
      setMatrixOpacity(0);
      // Keep Starfield visible in heart phase
      setStarfieldOpacity(1);
    }
  }, [phase]);

  const handleBookComplete = () => {
    // Add 300ms buffer before transitioning to heart (increased from 200ms)
    setTimeout(() => {
      setPhase("heart");
    }, 300);
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden bg-black">
      {/* Orientation Lock Overlay */}
      <OrientationLock />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Matrix Background - Always rendered, controlled by opacity */}
      <MatrixBackground opacity={matrixOpacity} />

      {/* Starfield Background - Fades in during book phase */}
      <Starfield opacity={starfieldOpacity} />

      {/* Phase Components */}
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <BootLoader onComplete={() => setPhase("countdown")} />
        )}

        {phase === "countdown" && (
          <motion.div
            key="countdown"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layout={false}
          >
            <Countdown onComplete={() => setPhase("reveal")} />
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layout={false}
          >
            <NeonReveal onComplete={() => setPhase("book")} />
          </motion.div>
        )}

        {phase === "book" && (
          <motion.div
            key="book"
            initial={{ opacity: 0, scale: 0.3, rotateX: -20, y: 100 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, rotateZ: 10, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ willChange: "transform, opacity", zIndex: 50 }}
            layout={false}
          >
            <BirthdayBook onComplete={handleBookComplete} />
          </motion.div>
        )}

        {phase === "heart" && (
          <motion.div
            key="heart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            layout={false}
          >
            <PhotoHeart />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
