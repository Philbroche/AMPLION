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
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <FAQSection />
    </div>
  );
}
