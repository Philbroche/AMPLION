import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FAQSection } from '../components/home/FAQSection';
import { QuizModal } from '../components/quiz/QuizModal';
import { trackPageView } from '../lib/analytics';

export function HomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    trackPageView('home');
  }, []);

  return (
    <div>
      <HeroSection onOpenQuiz={() => setIsQuizOpen(true)} />
      <BenefitsSection />
      <ServicesSection />
      <FAQSection />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
