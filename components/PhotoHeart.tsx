"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface PhotoHeartProps {
  onComplete?: () => void;
}

export default function PhotoHeart({ onComplete }: PhotoHeartProps) {
  const [isReady, setIsReady] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) {
        // Mobile: scale down to fit screen width
        setScale(Math.min(window.innerWidth / 700, 1));
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const [photos] = useState(() => {
    const photoCount = 36; // Reduced from 40 to prevent clumping
    const photos: { id: number; x: number; y: number; url: string }[] = [];
    const realPhotos = [
      "/1.png", "/2.jfif", "/3.png", "/4.png", "/5.png",
      "/6.jpg", "/7.jfif", "/8.jpg", "/9.jpg", "/10.png"
    ];

    for (let i = 0; i < photoCount; i++) {
      // Offset by 0.5 to avoid exact bottom tip clustering
      const t = ((i + 0.5) / photoCount) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      photos.push({
        id: i,
        x: x * 18,
        y: y * 18,
        url: realPhotos[i % realPhotos.length],
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
    <div className="fixed inset-0 w-screen h-[100dvh] z-40 overflow-hidden">
      {/* Large Blurred Pink Radial Gradient (Foggy Neon Atmosphere) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 51, 119, 0.25) 0%, rgba(255, 51, 119, 0.1) 40%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: -1,
        }}
      />

      {/* Pink Glow Halo Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 51, 119, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Heart Container - Absolute Dead Center */}
      <motion.div
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        variants={containerVariants}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          willChange: "transform",
        }}
      >
        <div className="relative">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              custom={{ x: photo.x, y: photo.y }}
              variants={photoVariants}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 border-white"
                whileHover={{ scale: 1.5, zIndex: 50 }}
                whileTap={{ scale: 1.5, zIndex: 50 }}
                style={{
                  transform: `rotate(${(Math.random() * 6 - 3)}deg) translateZ(0)`,
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  filter: "drop-shadow(0 0 8px rgba(255, 51, 119, 0.8)) saturate(1.5) brightness(1.1)",
                }}
              >
                <img
                  src={photo.url}
                  alt={`Memory ${photo.id}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  style={{
                    transform: "translateZ(0)",
                    aspectRatio: "1 / 1",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Center Pulsing Heart */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isReady ? [0, 1.2, 1] : 0 }}
            transition={{ duration: 1, delay: 2 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              willChange: "transform",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
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
                  filter: "drop-shadow(0 0 20px rgba(255, 51, 119, 0.9))",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
