import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Workflow, Sparkles, Settings } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies for maximum performance and user experience.',
    features: ['React & Next.js', 'Mobile-First Design', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation (N8N)',
    description: 'Streamline your operations with intelligent automation workflows that connect all your business tools.',
    features: ['Process Automation', 'API Integrations', 'Custom Workflows', 'Real-time Sync'],
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Creative (VEO3)',
    description: 'Leverage AI to create stunning content, from video production to creative assets that engage your audience.',
    features: ['AI Video Generation', 'Content Creation', 'Brand Assets', 'Creative Automation'],
  },
  {
    icon: Settings,
    title: 'Managed Systems',
    description: 'End-to-end management of your tech stack, ensuring everything runs smoothly 24/7.',
    features: ['System Monitoring', '24/7 Support', 'Performance Optimization', 'Security Updates'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-heading">
            Our <span className="text-orange">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI automation solutions designed to amplify your business operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-navy to-deepBg rounded-2xl p-8 border-2 border-cyan/30 hover:border-cyan hover:shadow-cyan-glow transition-all duration-300"
            >
              <div className="bg-cyan/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-cyan" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
