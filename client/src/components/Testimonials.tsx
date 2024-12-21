import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef
  });

  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-50%"]);

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

        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden"
        >
          <motion.div 
            className="flex gap-8 px-4 pb-4 min-w-full"
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[600px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.alt}
                  className="w-full h-auto rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                  draggable="false"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
