import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-orange text-white relative overflow-hidden mt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange via-yellow/20 to-orange opacity-50 animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center justify-center gap-3 text-center h-full">
            <Zap className="h-5 w-5 flex-shrink-0 animate-pulse" />
            <p className="font-medium text-sm sm:text-base">
              <span className="font-bold">Special Offer:</span> Get 20% off your first automation package! Use code{' '}
              <span className="font-bold bg-white/20 px-2 py-1 rounded">FIRST20</span>
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
