import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "/attached_assets/image_1734851131092.png",
    alt: "ChatGPT Interface - Interactive AI chat platform"
  },
  {
    url: "/attached_assets/image_1734852504510.png",
    alt: "AI Platform Interface - Modern chat interface for intelligent interactions"
  },
  {
    url: "/attached_assets/image_1734852532429.png",
    alt: "Knowledge Platform - Where knowledge begins with comprehensive search capabilities"
  },
  {
    url: "/attached_assets/image_1734853957822.png",
    alt: "Advanced Search Interface - Intuitive search and discovery platform"
  }
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPaused(true);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto h-[calc(100vh-200px)] overflow-hidden rounded-lg bg-white shadow-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
        onClick={previousImage}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
        onClick={nextImage}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex 
                ? "bg-white" 
                : "bg-white/50"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPaused(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
