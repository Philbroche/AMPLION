import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Workflow, Sparkles, Settings, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

const icons = [Globe, Workflow, Sparkles, Settings];

export function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language].services;

  return (
    <section className="py-24 bg-gradient-to-br from-deepBg to-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            {t.heading}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-orange hover:shadow-orange-glow transition-all duration-300"
              >
                <div className="bg-deepBg rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-orange" />
                </div>

                <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-2" role="list">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-500">
                      <Check className="h-4 w-4 text-orange mr-3 flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
