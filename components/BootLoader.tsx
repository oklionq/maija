"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate realistic boot progress with random chunks
    const intervals: NodeJS.Timeout[] = [];
    let currentProgress = 0;

    const updateProgress = () => {
      if (currentProgress >= 100) {
        intervals.forEach(clearTimeout);
        // Wait 400ms before transitioning
        setTimeout(() => {
          onComplete();
        }, 400);
        return;
      }

      // Random increment between 4-15%
      const increment = Math.floor(Math.random() * 12) + 4;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      // Random delay between 100-300ms for realistic feel
      const delay = Math.floor(Math.random() * 200) + 100;
      const timeout = setTimeout(updateProgress, delay);
      intervals.push(timeout);
    };

    // Start the boot sequence
    updateProgress();

    return () => {
      intervals.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="font-mono text-center">
        <div className="text-[#ff3377] text-2xl md:text-3xl mb-4">
          [ {progress.toString().padStart(3, " ")}% ] SYSTEM_BOOT...
        </div>
        <div className="text-white/60 text-sm md:text-base">
          Initializing birthday protocol
        </div>
      </div>
    </motion.div>
  );
}
