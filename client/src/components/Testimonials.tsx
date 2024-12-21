import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    imageUrl: "97b1bee74063fb3e8db1f43b3629f28.jpg",
    alt: "Client testimonial about ChatGPT access in China"
  },
  {
    id: 2,
    imageUrl: "f59d129b53b4f4fe2b940bf525c6fdb.jpg",
    alt: "Client testimonial about excellent service experience"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            What our clients say about our services
          </p>
        </motion.div>

        <div className="relative w-full max-w-3xl mx-auto h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -500 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={testimonials[currentIndex].imageUrl}
                alt={testimonials[currentIndex].alt}
                className="w-full h-full object-contain rounded-xl shadow-xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
