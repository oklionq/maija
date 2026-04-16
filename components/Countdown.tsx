"use client";

import { motion } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377]"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1, times: [0, 0.5, 1] }}
        >
          3
        </motion.div>
      </motion.div>

      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1, delay: 1, times: [0, 0.5, 1] }}
      >
        2
      </motion.div>

      <motion.div
        className="font-[family-name:var(--font-vt323)] text-[20vw] text-[#ff3377] absolute"
        style={{
          textShadow: "0 0 20px #ff3377, 0 0 40px #ff3377, 0 0 60px #ff3377",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1, delay: 2, times: [0, 0.5, 1] }}
        onAnimationComplete={onComplete}
      >
        1
      </motion.div>
    </div>
  );
}
