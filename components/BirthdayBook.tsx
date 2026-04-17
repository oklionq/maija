"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Hand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showHint, setShowHint] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // Prevent scrolling/bouncing on iOS
    document.body.style.overflow = "hidden";
    
    // Hide hint after 3 seconds automatically
    const timer = setTimeout(() => setShowHint(false), 3000);
    
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  if (!memories || memories.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-black/40"
      style={{ width: "100%", height: "100dvh", touchAction: "none" }}
    >
      {/* Top Header Pill */}
      <div 
        className="absolute z-[100] bg-white rounded-full px-8 py-3 shadow-xl flex items-center justify-center"
        style={{ top: "2.5rem" }}
      >
        <h1 className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-900 m-0 leading-none">
          Happy Birthday Maija! ✨
        </h1>
      </div>

      {/* Swipe Hint Animation */}
      <AnimatePresence>
        {showHint && !isEnd && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute z-50 pointer-events-none flex flex-col items-center justify-center text-white/90 drop-shadow-xl"
            style={{ bottom: "12%" }}
          >
            <motion.div
              animate={{ x: [-15, 25, -15] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Hand size={48} className="drop-shadow-lg" />
            </motion.div>
            <span className="mt-3 text-sm font-bold tracking-widest uppercase text-white/90 shadow-black drop-shadow-lg">
              Swipe to see more
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swiper Container */}
      <div className="w-full flex justify-center items-center h-full z-40">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={(swiper) => {
            if (showHint) setShowHint(false);
            setIsEnd(swiper.isEnd);
          }}
          className="w-[min(85vw,42vh)] h-[min(113vw,56vh)] max-h-[65vh] drop-shadow-2xl"
          style={{
            WebkitTransform: "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
            overflow: "visible", // required so cards don't get clipped by edge
          }}
        >
          {memories.map((memory, idx) => (
            <SwiperSlide
              key={memory.id}
              className="bg-white p-[12px] rounded-2xl flex justify-center items-center shadow-black/40"
              style={{
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden bg-gray-100"
                style={{
                  WebkitTransform: "translate3d(0,0,0)",
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <img
                  src={memory.imageUrl}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading={idx < 3 ? "eager" : "lazy"}
                  style={{
                    WebkitTransform: "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Final Button Overlay */}
      <AnimatePresence>
        {isEnd && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-12 sm:bottom-20 z-[110]"
          >
            <button
              onClick={onComplete}
              aria-label="Open My Heart"
              className="px-8 py-4 rounded-full flex items-center justify-center backdrop-blur-md bg-[#ff3377] text-white shadow-[0_0_40px_rgba(255,51,119,0.9)] animate-pulse font-bold text-xl whitespace-nowrap"
              style={{
                touchAction: "manipulation",
              }}
            >
              Open My Heart ❤️
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
