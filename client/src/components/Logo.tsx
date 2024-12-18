import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -2, 2, -2, 0],
        transition: {
          scale: { type: "spring", stiffness: 400, damping: 10 },
          rotate: { duration: 1, repeat: Infinity }
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="relative w-16 h-16 cursor-pointer"
    >
      <motion.img
        src="/logo.png"
        alt="AIConsult Hub"
        className="w-full h-full object-contain"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
