"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import { ChevronLeft, ChevronRight, Hand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // Prevent scrolling/bouncing on iOS Safari
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCompleteClick = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      onComplete();
    } catch (err) {
      console.error(err);
    }
  };

  if (!memories || memories.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-black/40"
      style={{ width: "100%", height: "100dvh", touchAction: "none" }}
    >
      {/* Top Header Pill */}
      <div 
        className="absolute z-[100] bg-white rounded-full px-8 py-3 shadow-xl flex items-center justify-center"
        style={{ top: "2rem" }}
      >
        <h1 className="font-[family-name:var(--font-dancing)] text-2xl md:text-3xl text-gray-900 m-0 leading-none">
          Happy Birthday Maija! ✨
        </h1>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-12 z-50 pointer-events-none">
        <button
          onClick={() => {
            if (swiperInstance) {
              swiperInstance.slidePrev();
            }
          }}
          disabled={currentIndex === 0}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg pointer-events-auto transition-all duration-300 ${currentIndex === 0 ? "opacity-0 scale-75" : "opacity-100 scale-100 hover:bg-white/40 hover:scale-110 active:scale-90"}`}
          style={{ touchAction: "manipulation" }}
        >
          <ChevronLeft size={36} />
        </button>
        <button
          onClick={() => {
            if (swiperInstance) {
              swiperInstance.slideNext();
            }
          }}
          disabled={isEnd}
          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg pointer-events-auto transition-all duration-300 ${isEnd ? "opacity-0 scale-75" : "opacity-100 scale-100 hover:bg-white/40 hover:scale-110 active:scale-90"}`}
          style={{ touchAction: "manipulation" }}
        >
          <ChevronRight size={36} />
        </button>
      </div>

      {/* Swiper Container */}
      <div className="w-full flex justify-center items-center h-full z-40">
        <Swiper
          onSwiper={setSwiperInstance}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
              rotate: [0, 0, -10],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          allowTouchMove={false} // Disable swipe as requested
          mousewheel={true}
          keyboard={true}
          grabCursor={false}
          modules={[EffectCreative, Mousewheel, Keyboard]}
          onSlideChange={(swiper) => {
            try {
              setCurrentIndex(swiper.activeIndex);
              setIsEnd(swiper.isEnd);
            } catch (err) {
              console.error(err);
            }
          }}
          className="w-[min(85vw,42vh)] h-[min(113vw,56vh)] max-h-[65vh] drop-shadow-2xl"
          style={{
            WebkitTransform: "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
            overflow: "visible", 
          }}
        >
          {memories.map((memory, idx) => (
            <SwiperSlide
              key={memory.id}
              className="bg-white p-[10px] rounded-2xl flex justify-center items-center shadow-black/40"
              style={{
                WebkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                willChange: "transform",
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden bg-gray-100"
                style={{
                  WebkitTransform: "translate3d(0,0,0)",
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform",
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
              onClick={handleCompleteClick}
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
