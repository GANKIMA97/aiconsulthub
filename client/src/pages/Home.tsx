import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Globe, Laptop, Briefcase } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { ThreeScene } from '@/components/ThreeScene';
import { ParticleBackground } from '@/components/ParticleBackground';

export function Home() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Brain,
      title: t('services.aiTools'),
      description: 'AI Tools Setup & Training, Exclusive AI Access, Custom AI Prompts Marketplace',
    },
    {
      icon: Globe,
      title: t('services.globalAccess'),
      description: 'International Apple ID Setup, PayPal Account Services, Global Numbers Service',
    },
    {
      icon: Laptop,
      title: t('services.digitalSolutions'),
      description: 'Professional Video Editing, Digital Marketing, SEO Services, Email Marketing',
    },
    {
      icon: Briefcase,
      title: t('services.businessCareer'),
      description: 'Business Consulting, Data Analysis Services, Career Coaching, Professional Development',
    },
    {
      icon: Globe,
      title: 'Language Academy',
      description: 'Personalized Language Instruction & HSK Preparation',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {window.WebGLRenderingContext && <ThreeScene />}
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 pt-16">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Technology"
                className="object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1699492846274-029109bc833e"
                alt="Cyberpunk City"
                className="object-cover w-full h-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative aspect-video rounded-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                alt="Neural Network"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
