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
  const [currentIndex, setCurrentIndex] = useState(0);

  // iPhone-First Fix: Disable body scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!memories || memories.length === 0) return null;

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= memories.length) return prev;
      return next;
    });
  };

  return (
    <div 
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
      style={{ width: "100vw", height: "100dvh" }}
    >
      {/* Top Header Pill */}
      <div 
        className="fixed z-[100] bg-white rounded-full px-8 py-3 shadow-lg flex items-center justify-center"
        style={{ top: "2rem" }}
      >
        <h1 className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-900 m-0">
          Happy Birthday Maija! ✨
        </h1>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute flex items-center justify-center w-full px-4"
            style={{ 
              WebkitTransform: "translate3d(0,0,0)", 
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden" 
            }}
          >
            {/* Polaroid-style Card */}
            <div
              className="bg-white p-[10px] rounded-2xl flex-shrink-0"
              style={{
                width: "min(90vw, 48vh)",
                height: "min(120vw, 65vh)",
                maxHeight: "65vh",
                aspectRatio: "3/4",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 50px rgba(255, 51, 119, 0.2)",
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden bg-gray-100"
                style={{ 
                  WebkitTransform: "translate3d(0,0,0)", 
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden" 
                }}
              >
                <img
                  src={memories[currentIndex].imageUrl}
                  alt={`Memory ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{ 
                    WebkitTransform: "translate3d(0,0,0)", 
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden" 
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous Photo"
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg"
            style={{ 
              width: "60px",
              height: "60px",
              touchAction: "manipulation" 
            }}
          >
            <ChevronLeft size={36} />
          </button>
        )}

        {currentIndex < memories.length - 1 ? (
          <button
            onClick={() => navigate(1)}
            aria-label="Next Photo"
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg"
            style={{ 
              width: "60px",
              height: "60px",
              touchAction: "manipulation" 
            }}
          >
            <ChevronRight size={36} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            aria-label="Open My Heart"
            className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full flex items-center justify-center backdrop-blur-md bg-[#ff3377] text-white z-50 shadow-[0_0_40px_rgba(255,51,119,0.8)] animate-pulse font-bold text-xl whitespace-nowrap"
            style={{ 
              touchAction: "manipulation",
              minHeight: "60px"
            }}
          >
            Open My Heart ❤️
          </button>
        )}
      </div>

      {/* Progress Counter */}
      <div className="fixed bottom-8 text-white/90 font-[family-name:var(--font-vt323)] text-xl z-50 tracking-widest bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
         {currentIndex + 1} / {memories.length}
      </div>
    </div>
  );
}
