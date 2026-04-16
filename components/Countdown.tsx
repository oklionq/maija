"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [shouldComplete, setShouldComplete] = useState(false);

  useEffect(() => {
    // After "1" disappears (at 4.5s), wait 0.8s before completing
    const timer = setTimeout(() => {
      setShouldComplete(true);
      onComplete();
    }, 5300); // 1.5s * 3 + 0.8s = 5.3s

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      {/* Number 3 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377]"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 0],
          filter: [
            "brightness(1) blur(0px)",
            "brightness(1.5) blur(2px)",
            "brightness(1) blur(0px)",
            "brightness(0.8) blur(1px)",
            "brightness(1) blur(0px)"
          ]
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.3, 0.6, 0.8, 1],
          ease: "easeInOut"
        }}
      >
        3
      </motion.div>

      {/* Number 2 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 0],
          filter: [
            "brightness(1) blur(0px)",
            "brightness(1.5) blur(2px)",
            "brightness(1) blur(0px)",
            "brightness(0.8) blur(1px)",
            "brightness(1) blur(0px)"
          ]
        }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          times: [0, 0.3, 0.6, 0.8, 1],
          ease: "easeInOut"
        }}
      >
        2
      </motion.div>

      {/* Number 1 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 0],
          filter: [
            "brightness(1) blur(0px)",
            "brightness(1.5) blur(2px)",
            "brightness(1) blur(0px)",
            "brightness(0.8) blur(1px)",
            "brightness(1) blur(0px)"
          ]
        }}
        transition={{
          duration: 1.5,
          delay: 3.0,
          times: [0, 0.3, 0.6, 0.8, 1],
          ease: "easeInOut"
        }}
      >
        1
      </motion.div>
    </div>
  );
}
