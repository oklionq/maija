"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "INITIALIZING_STARDUST...",
  "DECRYPTING_MEMORIES...",
  "LOADING_HEART_MODULES...",
  "PREPARING_NEON_GLOW...",
  "CALIBRATING_MATRIX...",
];

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(loadingMessages[0]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Pre-load all photos for PhotoHeart during boot
    const photoCount = 40;
    const imagePromises: Promise<void>[] = [];

    for (let i = 0; i < photoCount; i++) {
      const img = new Image();
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
      });
      img.src = `https://picsum.photos/seed/${i + 100}/100/100`;
      imagePromises.push(promise);
    }

    // Pre-load BirthdayBook images
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
      img.src = `https://picsum.photos/seed/${i}/400/600`;
      imagePromises.push(promise);
    }

    // Flickering cursor animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Smooth progress over exactly 4 seconds
    const timeouts: NodeJS.Timeout[] = [];
    const totalDuration = 4000; // 4 seconds
    const updateInterval = 50; // Update every 50ms
    const totalSteps = totalDuration / updateInterval;
    let currentStep = 0;

    const updateProgress = () => {
      currentStep++;
      const newProgress = Math.min(100, Math.floor((currentStep / totalSteps) * 100));
      setProgress(newProgress);

      // Update messages based on progress
      if (newProgress < 25) {
        setMessage(loadingMessages[0]);
      } else if (newProgress < 50) {
        setMessage(loadingMessages[1]);
      } else if (newProgress < 75) {
        setMessage(loadingMessages[2]);
      } else if (newProgress < 95) {
        setMessage(loadingMessages[3]);
      } else {
        setMessage(loadingMessages[4]);
      }

      if (currentStep < totalSteps) {
        const timeout = setTimeout(updateProgress, updateInterval);
        timeouts.push(timeout);
      } else {
        // Stay at 100% for the full 4 seconds, then transition
        const timeout = setTimeout(() => {
          onComplete();
        }, 0);
        timeouts.push(timeout);
      }
    };

    // Start the sequence
    const startTimeout = setTimeout(updateProgress, 100);
    timeouts.push(startTimeout);

    return () => {
      clearInterval(cursorInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="font-mono text-center">
        <div className="text-[#ff3377] text-2xl md:text-3xl mb-4">
          [ {progress.toString().padStart(3, " ")}% ]{showCursor ? "_" : " "}
        </div>
        <div className="text-white/60 text-sm md:text-base">
          {message}
        </div>
      </div>
    </motion.div>
  );
}
