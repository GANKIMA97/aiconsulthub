import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    url: "/32a562f9227106bed2d2e598ac83e9f.jpg",
    alt: "ChatGPT Advanced AI Interface"
  },
  {
    url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
    alt: "Business Innovation Hub"
  },
  {
    url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
    alt: "Modern Education Technology"
  },
  {
    url: "/e8976f9fd96cc606b1397c86bd0e0fd.jpg",
    alt: "Claude AI Interface"
  },
  {
    url: "/2f8a51efba00b5611689a9e2b793a81.jpg",
    alt: "Perplexity Knowledge Platform"
  }
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -1000 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
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
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
