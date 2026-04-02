import React from 'react';
import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const faqs = [
  {
    question: 'What exactly does AMPLION do?',
    answer: 'We build the digital infrastructure growing businesses need — custom websites, AI-powered workflow automation, creative content systems, and fully managed tech stacks. We identify what is costing you time and revenue, then we eliminate it.',
  },
  {
    question: 'How do I know if I need automation?',
    answer: 'If your team is doing the same tasks manually every week — following up with leads, entering data, sending reports, booking appointments — you need automation. The average business loses 15–20 hours per week to work that a properly built system handles automatically.',
  },
  {
    question: 'What tools and platforms do you work with?',
    answer: 'We build on n8n, which connects with 400+ tools including CRMs, booking systems, email platforms, Slack, Google Workspace, payment processors, and more. If your tool has an API, we can automate it.',
  },
  {
    question: 'Do I need to be technical to work with you?',
    answer: 'Not at all. You describe the problem in plain language — we handle everything technical. We deliver systems that your team can actually use without needing a developer.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Simple automations can go live within a week. More complex multi-system workflows typically take 2–4 weeks. We give you a clear timeline on the strategy call before any work begins.',
  },
  {
    question: 'How do we get started?',
    answer: 'Book a free 15-minute strategy call. Tell us what is slowing you down or where you are losing revenue. We will tell you exactly what we would build and what it costs. No obligation.',
  },
];

export function FAQSection() {
  const { openModal } = useBooking();

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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our automation solutions
          </p>
        </motion.div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
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
          <p className="text-gray-600 mb-4">Still have questions? Let's talk!</p>
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center px-8 py-3 min-h-[44px] bg-orange text-white font-medium rounded-lg hover:shadow-orange-glow transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            Book a Free Strategy Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
