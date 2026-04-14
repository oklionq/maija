"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MatrixBackground from "@/components/MatrixBackground";
import Countdown from "@/components/Countdown";
import NeonReveal from "@/components/NeonReveal";
import BirthdayBook from "@/components/BirthdayBook";
import PhotoHeart from "@/components/PhotoHeart";

type Phase = "countdown" | "reveal" | "book" | "heart";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("countdown");
  const [matrixOpacity, setMatrixOpacity] = useState(1);

  useEffect(() => {
    if (phase === "reveal") {
      setTimeout(() => setMatrixOpacity(0.3), 500);
    }
    if (phase === "book") {
      setMatrixOpacity(0.1);
    }
    if (phase === "heart") {
      setMatrixOpacity(0);
    }
  }, [phase]);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Matrix Background */}
      <MatrixBackground opacity={matrixOpacity} />

      {/* Phase Components */}
      <AnimatePresence mode="wait">
        {phase === "countdown" && (
          <motion.div
            key="countdown"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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
          >
            <NeonReveal onComplete={() => setPhase("book")} />
          </motion.div>
        )}

        {phase === "book" && (
          <motion.div
            key="book"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <BirthdayBook onComplete={() => setPhase("heart")} />
          </motion.div>
        )}

        {phase === "heart" && (
          <motion.div
            key="heart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <PhotoHeart />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
