import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { trackClick } from '../../lib/analytics';

export function HeroSection({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deepBg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-orange/10 animate-pulse" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <img
              src="/Sleek Circular Design for AMPLION (2).png"
              alt="Amplion"
              className="h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 mx-auto drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-heading"
          >
            <span className="bg-gradient-to-r from-cyan via-yellow to-orange bg-clip-text text-transparent">
              AMPLION
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto"
          >
            Amplifying Business Intelligence Through AI Automation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mb-12 max-w-5xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-navy to-deepBg rounded-2xl p-8 sm:p-12 border-2 border-cyan/30 shadow-[0_0_50px_rgba(0,229,255,0.2)]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan/5 to-orange/5 rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <Zap className="h-12 w-12 text-yellow animate-pulse" />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  Transform Your Business with AI Automation
                </h2>

                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Discover how we can amplify your operations, boost efficiency, and drive growth through intelligent automation solutions tailored to your business needs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => {
                      trackClick('hero_cta_primary', 'button');
                      onOpenQuiz();
                    }}
                    className="animate-pulse-glow"
                  >
                    Request a Call to Know How We Can Amplify Your Business Our Way
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                onClick={() => trackClick('hero_cta_secondary', 'button')}
              >
                Explore Our Solutions
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-cyan rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-cyan rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
