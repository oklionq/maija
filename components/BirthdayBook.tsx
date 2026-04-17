"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Memory {
  id: number;
  imageUrl: string;
}

const memories: Memory[] = [
  { id: 1, imageUrl: "/2.jfif" },
  { id: 2, imageUrl: "/6.jpg" },
  { id: 3, imageUrl: "/3.png" },
  { id: 4, imageUrl: "/9.jpg" },
  { id: 5, imageUrl: "/5.png" },
  { id: 6, imageUrl: "/1.png" },
  { id: 7, imageUrl: "/4.png" },
  { id: 8, imageUrl: "/7.jfif" },
  { id: 9, imageUrl: "/8.jpg" },
  { id: 10, imageUrl: "/10.png" },
];

interface BirthdayBookProps {
  onComplete: () => void;
}

export default function BirthdayBook({ onComplete }: BirthdayBookProps) {
  const [index, setIndex] = useState(0);

  // iOS Safari: Prevent body scroll while gallery is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Safety Check
  if (!memories || memories.length === 0) return null;

  const paginate = (dir: number) => {
    setIndex((prev) => Math.max(0, Math.min(prev + dir, memories.length - 1)));
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center z-30 overflow-hidden">
      {/* Top Header Pill */}
      <div className="fixed top-8 z-50 bg-white/90 backdrop-blur-md rounded-full px-8 py-3 shadow-lg">
        <h1 className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-900">
          Happy Birthday Maija! ✨
        </h1>
      </div>

      {/* Main Frame Container */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center justify-center"
            style={{ width: "100%" }}
          >
            {/* Photo Card */}
            <div
              className="bg-white p-[10px] rounded-2xl flex-shrink-0"
              style={{
                width: "min(90vw, 45vh)",
                height: "min(120vw, 60vh)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 50px rgba(255, 51, 119, 0.15)",
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden bg-gray-100"
                style={{ transform: "translateZ(0)" }}
              >
                <img
                  src={memories[index].imageUrl}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ transform: "translateZ(0)" }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {index > 0 && (
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous Photo"
            className="fixed left-4 top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {index < memories.length - 1 ? (
          <button
            onClick={() => paginate(1)}
            aria-label="Next Photo"
            className="fixed right-4 top-1/2 -translate-y-1/2 w-[56px] h-[56px] rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronRight size={32} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            aria-label="Continue"
            className="fixed bottom-20 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full flex items-center justify-center backdrop-blur-md bg-[#ff3377] text-white z-50 shadow-[0_0_30px_rgba(255,51,119,0.8)] animate-pulse font-bold text-lg whitespace-nowrap"
            style={{ touchAction: "manipulation" }}
          >
            Open Your Heart ❤️
          </button>
        )}
      </div>

      {/* Progress Counter */}
      <div className="fixed bottom-8 text-white/80 font-[family-name:var(--font-vt323)] text-xl z-50 tracking-widest">
        {index + 1} / {memories.length}
      </div>
    </div>
  );
}
