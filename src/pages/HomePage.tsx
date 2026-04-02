import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FAQSection } from '../components/home/FAQSection';
import { trackPageView } from '../lib/analytics';

export function HomePage() {
  useEffect(() => {
    trackPageView('home');
  }, []);

  return (
    <div>
      <div id="hero">
        <HeroSection />
      </div>
      <BenefitsSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
    </div>
  );
}
