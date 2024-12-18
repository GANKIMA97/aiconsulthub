import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export function ServiceCard({ title, icon: Icon, description }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { type: "spring", stiffness: 400 }
      }}
    >
      <Card className="relative overflow-hidden bg-background/30 backdrop-blur-lg border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/40">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"
          whileHover={{ opacity: [0.1, 0.2, 0.1], transition: { repeat: Infinity, duration: 2 } }}
        />
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary/80" />
            </motion.div>
            <span className="transition-colors duration-300 group-hover:text-primary">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-tight text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
