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
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden bg-background/30 backdrop-blur-lg border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
