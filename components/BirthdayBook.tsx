"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BookPage {
  id: number;
  leftContent: {
    text: string;
  };
  rightContent: {
    imageUrl: string;
  };
}

const pages: BookPage[] = [
  {
    id: 1,
    leftContent: {
      text: "Dear Maija,\n\nOn this special day, we celebrate the amazing person you are. Your smile lights up every room you enter.",
    },
    rightContent: {
      imageUrl: "/2.jfif",
    },
  },
  {
    id: 2,
    leftContent: {
      text: "Your kindness and warmth touch everyone around you. You make the world a better place just by being in it.",
    },
    rightContent: {
      imageUrl: "/6.jpg",
    },
  },
  {
    id: 3,
    leftContent: {
      text: "Every moment with you is a treasure. Your laughter is contagious and your spirit is inspiring.",
    },
    rightContent: {
      imageUrl: "/3.png",
    },
  },
  {
    id: 4,
    leftContent: {
      text: "May this year bring you endless joy, unforgettable adventures, and all the happiness you deserve.",
    },
    rightContent: {
      imageUrl: "/9.jpg",
    },
  },
  {
    id: 5,
    leftContent: {
      text: "Happy Birthday, Maija!\n\nWith all our love,\nYour friends and family ❤️",
    },
    rightContent: {
      imageUrl: "/5.png",
    },
  },
];

interface BirthdayBookProps {
  onComplete: () => void;
}

export default function BirthdayBook({ onComplete }: BirthdayBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < pages.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const handleLastPageNext = () => {
    // Trigger transition to heart phase
    onComplete();
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 180,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-4xl aspect-[16/10]">
      <div className="relative w-full h-full perspective-[2000px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 bg-white rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
            layout={false}
          >
            {/* Left Page */}
            <div className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
              <p
                className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-800 whitespace-pre-line leading-relaxed"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {pages[currentPage].leftContent.text}
              </p>
            </div>

            {/* Right Page - Polaroid Style */}
            <div className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
              <motion.div
                className="bg-white p-4 shadow-xl"
                style={{
                  transform: "rotate(2deg) translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
                whileTap={{ scale: 1.05, rotate: 0 }}
              >
                <img
                  src={pages[currentPage].rightContent.imageUrl}
                  alt={`Memory ${currentPage + 1}`}
                  className="w-full h-64 md:h-80 object-cover"
                  loading="eager"
                  style={{
                    transform: "translateZ(0)",
                  }}
                />
                <div className="h-12 flex items-center justify-center">
                  <p className="font-[family-name:var(--font-dancing)] text-gray-600 text-lg">
                    Memory #{currentPage + 1}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentPage > 0 && (
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-16 bg-[#ff3377] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform touch-manipulation"
            style={{
              boxShadow: "0 0 20px #ff3377",
              minWidth: "48px",
              minHeight: "48px",
              cursor: "pointer",
              paddingBottom: "max(16px, env(safe-area-inset-bottom, 20px))",
            }}
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 bg-[#ff3377] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform touch-manipulation"
            style={{
              boxShadow: "0 0 20px #ff3377",
              minWidth: "48px",
              minHeight: "48px",
              cursor: "pointer",
              paddingBottom: "max(16px, env(safe-area-inset-bottom, 20px))",
            }}
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Arrow on last page to go to heart */}
        {currentPage === pages.length - 1 && (
          <button
            onClick={handleLastPageNext}
            className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-16 bg-[#ff3377] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform animate-pulse touch-manipulation"
            style={{
              boxShadow: "0 0 20px #ff3377",
              minWidth: "48px",
              minHeight: "48px",
              cursor: "pointer",
              paddingBottom: "max(16px, env(safe-area-inset-bottom, 20px))",
            }}
            aria-label="Continue to heart"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Page Counter */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[#ff3377] font-[family-name:var(--font-vt323)] text-xl">
          {currentPage + 1} / {pages.length}
        </div>
      </div>
    </div>
  );
}
