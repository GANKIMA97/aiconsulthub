import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Globe, Laptop, Briefcase, BookOpen } from 'lucide-react';
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
      details: {
        description: 'Unlock the full potential of artificial intelligence with our comprehensive AI tools and services. We provide expert guidance and seamless access to cutting-edge AI platforms.',
        features: [
          'Advanced AI Platform Access and Integration',
          'Custom AI Model Training and Fine-tuning',
          'Exclusive AI Prompts Marketplace',
          'AI Tools Setup and Configuration',
          'Performance Optimization and Monitoring'
        ],
        benefits: [
          'Accelerate your workflow with AI-powered automation',
          'Access premium AI models and features',
          'Receive expert guidance and support',
          'Stay ahead with the latest AI technologies',
          'Optimize costs while maximizing AI capabilities'
        ]
      }
    },
    {
      icon: Globe,
      title: t('services.globalAccess'),
      description: 'International Apple ID Setup, PayPal Account Services, Global Numbers Service',
      details: {
        description: 'Break down geographical barriers with our comprehensive global access solutions. We help you establish and maintain your international digital presence.',
        features: [
          'International Apple ID Registration and Setup',
          'PayPal Account Creation and Verification',
          'Global Phone Numbers Service',
          'Cross-border Payment Solutions',
          'International Digital Identity Management'
        ],
        benefits: [
          'Access region-restricted services and content',
          'Secure international payment capabilities',
          'Maintain global communication channels',
          'Expand your business internationally',
          'Overcome geographical restrictions'
        ]
      }
    },
    {
      icon: Laptop,
      title: t('services.digitalSolutions'),
      description: 'Professional Video Editing, Digital Marketing, SEO Services, Email Marketing',
      details: {
        description: 'Transform your digital presence with our comprehensive suite of digital solutions. From content creation to marketing strategies, we help you stand out in the digital landscape.',
        features: [
          'Professional Video Editing and Production',
          'Comprehensive Digital Marketing Campaigns',
          'Advanced SEO Optimization',
          'Email Marketing Automation',
          'Social Media Management'
        ],
        benefits: [
          'Enhance your brand visibility',
          'Increase online engagement and conversions',
          'Improve search engine rankings',
          'Build stronger customer relationships',
          'Maximize marketing ROI'
        ]
      }
    },
    {
      icon: Briefcase,
      title: t('services.businessCareer'),
      description: 'Business Consulting, Data Analysis Services, Career Coaching, Professional Development',
      details: {
        description: 'Elevate your business and career with our expert consulting services. We provide comprehensive guidance for both organizational growth and professional development.',
        features: [
          'Strategic Business Consulting',
          'Advanced Data Analysis Services',
          'Career Development Planning',
          'Professional Skills Training',
          'Leadership Development Programs'
        ],
        benefits: [
          'Make data-driven business decisions',
          'Accelerate career growth',
          'Develop essential leadership skills',
          'Improve business operations',
          'Achieve professional goals'
        ]
      }
    },
    {
      icon: BookOpen,
      title: 'Language Academy',
      description: 'Personalized Language Instruction & HSK Preparation',
      details: {
        description: 'Excel in language learning with our personalized instruction programs. We offer comprehensive language training with a focus on HSK preparation and practical communication skills.',
        features: [
          'Personalized HSK Preparation Courses',
          'One-on-One Language Instruction',
          'Business Language Training',
          'Translation Services',
          'Cultural Exchange Programs'
        ],
        benefits: [
          'Achieve HSK certification goals',
          'Improve language proficiency',
          'Enhance business communication',
          'Gain cultural understanding',
          'Receive personalized attention'
        ]
      }
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
      <section id="services" className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 place-items-center">
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
                className="w-full"
              >
                <ServiceCard
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                  details={service.details}
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
