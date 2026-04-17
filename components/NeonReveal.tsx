"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface NeonRevealProps {
  onComplete: () => void;
}

export default function NeonReveal({ onComplete }: NeonRevealProps) {
  const text = "HAPPY BIRTHDAY MAIJA";
  const letters = text.split("");

  useEffect(() => {
    // Animation duration: 20 letters * 0.05s delay + 0.5s animation + 3s display = ~4.5s
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[8vw] md:text-[6vw] text-[#ff3377] text-center px-4"
        style={{
          textShadow: "0 0 10px #ff3377, 0 0 20px #ff3377, 0 0 40px #ff3377",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
            style={{
              display: "inline-block",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
