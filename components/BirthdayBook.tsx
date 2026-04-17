"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex((prev) => prev + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center z-30">
      {/* Top Header */}
      <div className="fixed top-8 z-50 rounded-full bg-white px-6 py-3 shadow-lg">
        <h1 className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-900">
          Happy Birthday Maija! ✨
        </h1>
      </div>

      {/* Main Card Container */}
      <div className="relative flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhotoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute flex items-center justify-center"
          >
            {/* Polaroid-style Card */}
            <div className="bg-white p-2 rounded-2xl shadow-[0_0_50px_rgba(255,51,119,0.3)] max-w-[90vw] md:max-w-[400px] w-full aspect-[3/4]">
              <img
                src={photos[currentPhotoIndex].imageUrl}
                alt={`Memory ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover rounded-xl"
                loading="eager"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentPhotoIndex > 0 && (
          <button
            onClick={prevPhoto}
            aria-label="Previous Photo"
            className="fixed left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg touch-manipulation"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {currentPhotoIndex < photos.length - 1 ? (
          <button
            onClick={nextPhoto}
            aria-label="Next Photo"
            className="fixed right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white z-50 shadow-lg touch-manipulation"
          >
            <ChevronRight size={32} />
          </button>
        ) : (
          <button
            onClick={onComplete}
            aria-label="Continue"
            className="fixed right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-[#ff3377] border border-white/30 text-white z-50 shadow-[0_0_30px_rgba(255,51,119,0.8)] touch-manipulation animate-pulse"
          >
            <Heart size={28} fill="white" />
          </button>
        )}
      </div>

      {/* Progress Counter */}
      <div className="fixed bottom-8 text-white/80 font-[family-name:var(--font-vt323)] text-xl z-50 tracking-widest">
        {currentPhotoIndex + 1} / {photos.length}
      </div>
    </div>
  );
}
