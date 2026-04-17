"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

export default function OrientationLock() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      const mobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      setIsPortrait(portrait);
      setIsMobile(mobile);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    // Also listen to matchMedia changes
    const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches);
    };

    portraitMediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      portraitMediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const shouldShowOverlay = isMobile && isPortrait;

  return (
    <AnimatePresence>
      {shouldShowOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
          style={{
            width: "100vw",
            height: "100dvh",
            touchAction: "none",
          }}
        >
          {/* Rotating Phone Icon */}
          <motion.div
            animate={{
              rotate: [0, -90, -90, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-8"
          >
            <Smartphone
              size={80}
              color="#ff3377"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255, 51, 119, 0.8))",
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-2xl text-center px-8 font-[family-name:var(--font-dancing)]"
            style={{
              textShadow: "0 0 10px rgba(255, 51, 119, 0.5)",
            }}
          >
            Пожалуйста, переверни экран ✨
          </motion.p>

          {/* Pulsing Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255, 51, 119, 0.2) 0%, transparent 70%)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
