import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="relative w-12 h-12"
    >
      <img
        src="/logo.png"
        alt="AIConsult Hub"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
