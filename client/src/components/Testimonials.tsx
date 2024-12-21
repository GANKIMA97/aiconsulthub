import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    imageUrl: "/97b1bee74063fb3e8db1f43b3629f28.jpg",
    alt: "Client testimonial about ChatGPT access in China"
  },
  {
    id: 2,
    imageUrl: "/f59d129b53b4f4fe2b940bf525c6fdb.jpg",
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
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground">
            What our clients say about our services
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="overflow-x-scroll scrollbar-hide cursor-grab"
        >
          <motion.div 
            className="flex gap-8 px-4"
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.alt}
                  className="w-[500px] h-auto rounded-lg shadow-lg"
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
