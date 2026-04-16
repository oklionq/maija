"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface PhotoHeartProps {
  onComplete?: () => void;
}

export default function PhotoHeart({ onComplete }: PhotoHeartProps) {
  const [isReady, setIsReady] = useState(false);
  const [photos] = useState(() => {
    const photoCount = 40;
    const photos: { id: number; x: number; y: number; url: string }[] = [];

    for (let i = 0; i < photoCount; i++) {
      const t = (i / photoCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      photos.push({
        id: i,
        x: x * 15 * 1.5,
        y: y * 15 * 1.5,
        url: `https://picsum.photos/seed/${i + 100}/100/100`,
      });
    }

    return photos;
  });

  useEffect(() => {
    // Delay animation start to prevent lag - increased to 800ms
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    const confettiTimer = setTimeout(() => {
      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.3, 0.7), y: 0.5 },
          colors: ["#ff3377", "#ff66aa", "#ffccdd", "#c0c0c0"],
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });
      }, 50);

      // Store interval ID for cleanup
      return () => clearInterval(interval);
    }, 4000);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const photoVariants = {
    hidden: { x: 0, y: 0, scale: 0, opacity: 0 },
    visible: (custom: { x: number; y: number }) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-40 overflow-hidden"
      initial="hidden"
      animate={isReady ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            custom={{ x: photo.x, y: photo.y }}
            variants={photoVariants}
            className="absolute"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shadow-lg border-2 border-white"
              whileHover={{ scale: 1.5, zIndex: 50 }}
              style={{
                transform: `rotate(${Math.random() * 20 - 10}deg) translateZ(0)`,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={photo.url}
                alt={`Memory ${photo.id}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Center Pulsing Heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isReady ? [0, 1.2, 1] : 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute z-50"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              size={80}
              fill="#ff3377"
              color="#ff3377"
              style={{
                filter: "drop-shadow(0 0 20px #ff3377) drop-shadow(0 0 40px #ff3377)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
