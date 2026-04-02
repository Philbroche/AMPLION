import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';
import { trackEvent } from '../lib/analytics';

const SERVICE_OPTIONS = [
  'Website Transformation',
  'Workflow Automation',
  'AI-Powered Creative',
  'Full Digital Management',
  'Not sure yet — I need advice',
];

interface PreBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreBookingModal({ isOpen, onClose }: PreBookingModalProps) {
  const [selectedService, setSelectedService] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const isFormComplete = selectedService !== '' && projectDescription.trim() !== '';

  const openCalendly = () => {
    (window as any).Calendly.initPopupWidget({
      url: 'https://calendly.com/philb-prog17/demo-call',
    });
  };

  const handleClose = () => {
    onClose();
    setSelectedService('');
    setProjectDescription('');
    setSubmitError(false);
  };

  const handleSubmit = async () => {
    if (!isFormComplete) return;
    setIsSubmitting(true);
    setSubmitError(false);

    const { error } = await supabase.from('booking_requests').insert({
      service: selectedService,
      project_description: projectDescription,
    });

    if (error) {
      console.error('Booking request submission error:', error);
      setSubmitError(true);
    } else {
      await trackEvent({
        event_name: 'booking_request_submitted',
        event_category: 'conversion',
        event_data: { service: selectedService },
      });
    }

    setIsSubmitting(false);
    handleClose();
    openCalendly();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
          <div
            className="w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-gradient-to-br from-navy to-deepBg rounded-2xl p-8 border-2 border-cyan/30 shadow-[0_0_50px_rgba(0,229,255,0.15)]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 id="modal-title" className="text-2xl font-bold text-white mb-2">
                    Tell Us About Your Project
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Takes 30 seconds — helps us make your strategy call as useful as possible.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors ml-4 flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg"
                  aria-label="Close dialog"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-3">
                  What are you looking to build? <span className="text-orange">*</span>
                </label>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedService(option)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 text-left ${
                        selectedService === option
                          ? 'bg-cyan/20 border-cyan text-cyan font-semibold'
                          : 'bg-navy border-cyan/30 text-gray-300 hover:border-cyan hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-3">
                  Briefly describe what you have in mind <span className="text-orange">*</span>
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={3}
                  placeholder="Ex: I run a plumbing company and need a new website with online booking, or I want to automate my client follow-up emails..."
                  className="w-full px-4 py-3 bg-deepBg border border-cyan/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan focus:outline-none resize-none"
                />
              </div>

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!isFormComplete || isSubmitting}
                isLoading={isSubmitting}
                className="w-full"
              >
                Continue to Book Your Call →
              </Button>

              {submitError && (
                <p
                  className="text-red-400 text-sm mt-3 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  Something went wrong. Please try again or email us at{' '}
                  <a href="mailto:Pbrochu@amplion.dev" className="underline">
                    Pbrochu@amplion.dev
                  </a>
                </p>
              )}
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
