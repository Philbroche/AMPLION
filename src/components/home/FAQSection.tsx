import React from 'react';
import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How much do your automation solutions cost?',
    answer: 'Our solutions range from $997 to $9,997 depending on complexity and scope. We offer packages for CRM automation, marketing automation, sales pipelines, and custom enterprise solutions. Each package includes implementation, training, and ongoing support.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Most automation projects take 2-6 weeks from kickoff to launch. Simple integrations can be completed in days, while complex enterprise solutions may take 2-3 months. We provide a detailed timeline after understanding your specific needs.',
  },
  {
    question: 'Do you offer custom solutions?',
    answer: 'Absolutely! While we have pre-built packages, we specialize in custom automation tailored to your unique business processes. Our team will analyze your workflows and design a solution that fits perfectly.',
  },
  {
    question: 'What kind of ongoing support do you provide?',
    answer: 'All packages include 30 days of post-launch support. We also offer managed service plans with 24/7 monitoring, regular optimization, priority support, and monthly strategy calls to ensure your automations continue delivering value.',
  },
  {
    question: 'Can you integrate with my existing tools?',
    answer: 'Yes! We work with 1000+ apps including Salesforce, HubSpot, Shopify, Mailchimp, Slack, and more. If your tool has an API, we can integrate it. We use N8N for maximum flexibility in connecting your tech stack.',
  },
  {
    question: 'What ROI can I expect?',
    answer: 'Our clients typically see 300%+ ROI within 6 months through time savings, reduced errors, and operational efficiency. For example, automating customer onboarding alone can save 10-20 hours per week for a growing business.',
  },
  {
    question: 'Do I need technical knowledge?',
    answer: 'Not at all! We handle all technical implementation and provide easy-to-understand training. Our solutions are designed for business users, not developers. We also provide documentation and video tutorials.',
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'We build flexible systems that can evolve with your business. Minor adjustments are included in your support period. For significant changes, we offer hourly consulting or you can upgrade to a managed service plan.',
  },
];

export function FAQSection() {
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
            Frequently Asked <span className="text-orange">Questions</span>
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
                  <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors group">
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
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-orange text-white font-medium rounded-lg hover:shadow-orange-glow transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
