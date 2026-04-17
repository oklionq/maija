"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoCard {
  id: number;
  imageUrl: string;
}

const photos: PhotoCard[] = [
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
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < photos.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const handleLastPageNext = () => {
    onComplete();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center">
      {/* Top Header Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-8 z-50 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg"
        style={{
          boxShadow: "0 0 30px rgba(255, 51, 119, 0.3)",
        }}
      >
        <h1 className="font-[family-name:var(--font-dancing)] text-3xl md:text-4xl text-gray-800">
          Happy Birthday Maija! ✨
        </h1>
      </motion.div>

      {/* Photo Card Container */}
      <div className="relative flex items-center justify-center w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              WebkitTransform: "translate3d(0, 0, 0)",
            }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white"
              style={{
                width: "min(300px, 85vw)",
                height: "min(400px, 70vh)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={photos[currentPage].imageUrl}
                alt={`Memory ${currentPage + 1}`}
                className="w-full h-full"
                loading="eager"
                style={{
                  objectFit: "cover",
                  display: "block",
                  transform: "translateZ(0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Navigation - Left */}
        {currentPage > 0 && (
          <button
            onClick={() => paginate(-1)}
            className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/30 transition-all touch-manipulation z-50"
            style={{
              width: "50px",
              height: "50px",
              minWidth: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Floating Navigation - Right */}
        {currentPage < photos.length - 1 && (
          <button
            onClick={() => paginate(1)}
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/30 transition-all touch-manipulation animate-pulse z-50"
            style={{
              width: "50px",
              height: "50px",
              minWidth: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Last Page - Continue to Heart */}
        {currentPage === photos.length - 1 && (
          <button
            onClick={handleLastPageNext}
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-[#ff3377] text-white rounded-full shadow-lg hover:scale-110 transition-all touch-manipulation animate-pulse z-50"
            style={{
              width: "50px",
              height: "50px",
              minWidth: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(255, 51, 119, 0.6)",
            }}
            aria-label="Continue to heart"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Page Counter */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-[family-name:var(--font-vt323)] text-xl z-50">
        {currentPage + 1} / {photos.length}
      </div>
    </div>
  );
}
