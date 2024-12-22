import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "/attached_assets/32a562f9227106bed2d2e598ac83e9f.jpg",
    alt: "ChatGPT Interface - Advanced AI conversation platform"
  },
  {
    url: "/attached_assets/e8976f9fd96cc606b1397c86bd0e0fd.jpg",
    alt: "Claude AI Interface - Intelligent digital assistant"
  },
  {
    url: "/attached_assets/2f8a51efba00b5611689a9e2b793a81.jpg",
    alt: "Perplexity AI Interface - Knowledge discovery platform"
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1024",
    alt: "Global Digital Access - Worldwide digital connectivity visualization with network nodes"
  },
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1024",
    alt: "Digital Solutions - Modern technology workspace with advanced solutions"
  },
  {
    url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1024",
    alt: "Business & Career Development - Professional growth and career advancement"
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
    <div className="w-full bg-gray-100">
      <div className="max-w-[800px] mx-auto p-6">
        {/* Fixed height container */}
        <div 
          className="relative h-[480px] bg-white rounded-lg shadow-lg overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image wrapper with padding */}
          <div className="absolute inset-0 p-6 flex items-center justify-center">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPaused(true);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex 
                    ? 'bg-black/70' 
                    : 'bg-black/30 hover:bg-black/50'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
