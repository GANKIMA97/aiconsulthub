import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: LucideIcon;
  details: {
    description: string;
    features: string[];
    benefits: string[];
  };
}

export function ServiceModal({ isOpen, onClose, title, icon: Icon, details }: ServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 bg-blue-50/80 backdrop-blur-lg">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {details.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] px-6">
          <div className="space-y-8 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {details.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="select-none">•</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3">
                {details.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="select-none">•</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </ScrollArea>

        <div className="p-6 bg-background/50 backdrop-blur-sm mt-auto">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
