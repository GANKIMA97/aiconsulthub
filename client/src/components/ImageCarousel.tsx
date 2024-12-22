import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "./attached_assets/image_1734850887216.png",
    alt: "Digital Solutions Hub - Comprehensive suite of digital transformation tools and services"
  },
  {
    url: "./attached_assets/image_1734851131092.png",
    alt: "Global Digital Access - Connecting communities worldwide through innovative digital solutions"
  },
  {
    url: "./attached_assets/image_1734764528461.png",
    alt: "Business & Career Development - Professional growth and career advancement services"
  },
  {
    url: "./attached_assets/image_1734765188522.png",
    alt: "Language Academy - Comprehensive language learning and cultural education"
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
      className="relative w-full h-[500px] overflow-hidden rounded-lg bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -1000 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-contain bg-white p-4"
        />
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
