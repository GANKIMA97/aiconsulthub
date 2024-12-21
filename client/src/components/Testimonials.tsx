import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from 'embla-carousel-autoplay';

const autoplayPlugin = AutoPlay({
  delay: 5000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  rootNode: (emblaRoot) => emblaRoot.parentElement,
}) as any; // Type assertion needed due to version mismatch

const testimonials = [
  {
    id: 1,
    imageUrl: "97b1bee74063fb3e8db1f43b3629f28.jpg",
    alt: "Client testimonial about ChatGPT access in China",
    content: "Positive Completion of Work"
  },
  {
    id: 2,
    imageUrl: "f59d129b53b4f4fe2b940bf525c6fdb.jpg",
    alt: "Client testimonial about excellence and commitment",
    content: "Delivering excellence with patience, enthusiasm, and a commitment to customer satisfaction."
  }
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

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

        <div className="relative w-full max-w-3xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplayPlugin]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <motion.div 
                    className="p-6 space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.alt}
                      className="w-full h-[300px] object-contain rounded-xl shadow-xl mb-4"
                    />
                    <div className="space-y-2">
                      <p className="text-lg text-center text-gray-700 dark:text-gray-300 italic">
                        "{testimonial.content}"
                      </p>
                      {testimonial.caption && (
                        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                          {testimonial.caption}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Navigation dots */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-primary/30"
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