import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  'AI Exclusive Tools',
  'Global Digital Access',
  'Digital Solutions',
  'Business & Career Development',
  'Language Academy'
];

export function TypewriterEffect() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const text = services[currentIndex];
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length + 1));
      }, 100); // Adjust speed of typing
      return () => clearTimeout(timeout);
    } else {
      // Wait before moving to next text
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentText('');
          setCurrentIndex((prev) => (prev + 1) % services.length);
          setIsTyping(true);
        }, 1000); // Wait before starting next text
      }, 1000); // How long to show completed text
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex, isTyping]);

  return (
    <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-r from-purple-100 via-cyan-100 to-blue-100 py-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600">
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              |
            </motion.span>
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}