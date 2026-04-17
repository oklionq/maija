"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [shouldComplete, setShouldComplete] = useState(false);

  useEffect(() => {
    // Total: 1.5s * 3 numbers + 1.0s void = 5.5s
    const timer = setTimeout(() => {
      setShouldComplete(true);
      onComplete();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Number animation variants with cinematic timing
  const numberVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0
    },
    visible: {
      scale: [0.5, 1.1, 1.1, 1.5],
      opacity: [0, 1, 1, 0],
      textShadow: [
        "0 0 20px #ff3377, 0 0 40px #ff3377",
        "0 0 30px #ff3377, 0 0 60px #ff3377",
        "0 0 25px #ff3377, 0 0 50px #ff3377",
        "0 0 40px #ff3377, 0 0 80px #ff3377"
      ],
      filter: [
        "brightness(1)",
        "brightness(1.2)",
        "brightness(1.1)",
        "brightness(1.5)"
      ]
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      {/* Number 3 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        variants={numberVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1.5,
          times: [0, 0.2, 0.8, 1],
          ease: [0.34, 1.56, 0.64, 1] // Custom easing for spring-like feel
        }}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity, filter",
        }}
      >
        3
      </motion.div>

      {/* Number 2 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        variants={numberVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1.5,
          delay: 1.5,
          times: [0, 0.2, 0.8, 1],
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity, filter",
        }}
      >
        2
      </motion.div>

      {/* Number 1 */}
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        variants={numberVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1.5,
          delay: 3.0,
          times: [0, 0.2, 0.8, 1],
          ease: [0.34, 1.56, 0.64, 1]
        }}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity, filter",
        }}
      >
        1
      </motion.div>
    </div>
  );
}
