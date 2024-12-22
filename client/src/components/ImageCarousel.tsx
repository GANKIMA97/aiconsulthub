import { useState, useEffect } from 'react';
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
      }, 5000);
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
    <div className="container mx-auto px-4 py-8">
      <div 
        className="relative h-[600px] bg-white rounded-lg shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={previousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPaused(true);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
