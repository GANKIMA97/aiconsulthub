import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  location?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "I'm pleased that the work is completed well. I have access to the Plus version of ChatGPT while in China.",
    location: "China"
  },
  {
    id: 2,
    content: "I am extremely satisfied with the service I received. The guy was remarkably patient and enthusiastic throughout the entire service. They were always ready to answer my questions with a smile and provided detailed and helpful explanations. Their positive attitude and dedication to ensuring my satisfaction truly made a difference. I would highly recommend this service to anyone.",
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full bg-background/50 backdrop-blur-lg border-primary/10 hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <QuoteIcon className="w-8 h-8 text-primary/40" />
                    <p className="text-lg leading-relaxed text-foreground/90">
                      {testimonial.content}
                    </p>
                    {testimonial.location && (
                      <p className="text-sm text-muted-foreground">
                        From {testimonial.location}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
