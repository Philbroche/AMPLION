import React from 'react';
import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function FAQSection() {
  const { openModal } = useBooking();
  const { language } = useLanguage();
  const t = translations[language].faq;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4 font-heading">
            {t.heading}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subheading}
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {t.items.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors group min-h-[56px]">
                    <span className="font-semibold text-navy text-lg pr-4">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-orange transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-4 text-gray-600 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">{t.stillHaveQuestions}</p>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[44px] bg-orange text-white font-medium rounded-lg hover:shadow-orange-glow transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            {t.bookCall}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
