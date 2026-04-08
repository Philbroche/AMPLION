import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

const icons = [Clock, DollarSign, TrendingUp, Users, Shield, Zap];

export function BenefitsSection() {
  const { language } = useLanguage();
  const t = translations[language].benefits;

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
            {t.heading} <span className="text-orange">Amplion</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-navy to-deepBg border border-cyan/20 rounded-xl p-6 hover:border-orange hover:shadow-orange-glow transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-cyan to-orange rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
