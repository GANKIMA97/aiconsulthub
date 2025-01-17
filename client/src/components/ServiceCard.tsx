import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { ServiceModal } from './ServiceModal';

interface ServiceDetails {
  description: string;
  features: string[];
  benefits: string[];
}

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  details: ServiceDetails;
}

export function ServiceCard({ title, icon: Icon, description, details }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { type: "spring", stiffness: 400 }
        }}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer"
      >
        <Card className="relative overflow-hidden bg-blue-50 backdrop-blur-lg border-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white to-blue-50"
            whileHover={{ opacity: [0.7, 0.8, 0.7], transition: { repeat: Infinity, duration: 2 } }}
          />
          <CardHeader className="pb-2 relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                <Icon className="h-5 w-5 text-primary transition-colors duration-300" />
              </motion.div>
              <span className="transition-colors duration-300 text-gray-950 font-black tracking-tight">{title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm leading-tight text-gray-950 font-extrabold tracking-tight">{description}</p>
          </CardContent>
        </Card>
      </motion.div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        icon={Icon}
        details={details}
      />
    </>
  );
}
