import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Users, Shield, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate repetitive tasks and reclaim hours every week for strategic work.',
  },
  {
    icon: DollarSign,
    title: 'Reduce Costs',
    description: 'Cut operational expenses by up to 60% with intelligent automation.',
  },
  {
    icon: TrendingUp,
    title: 'Scale Faster',
    description: 'Grow your business without proportionally increasing headcount.',
  },
  {
    icon: Users,
    title: 'Improve Collaboration',
    description: 'Connect teams and tools seamlessly for better communication.',
  },
  {
    icon: Shield,
    title: 'Minimize Errors',
    description: 'Eliminate human error with precise, automated workflows.',
  },
  {
    icon: Zap,
    title: 'Boost Productivity',
    description: 'Empower your team to focus on high-value, creative work.',
  },
];

export function BenefitsSection() {
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
            Why Choose <span className="text-cyan">Amplion</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your business operations with measurable results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-navy/50 backdrop-blur-sm rounded-xl p-6 border border-cyan/20 hover:border-orange hover:shadow-orange-glow transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-cyan to-orange rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: '150+', label: 'Projects Completed' },
            { value: '10K+', label: 'Hours Saved' },
            { value: '300%', label: 'Avg ROI Increase' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-cyan mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
