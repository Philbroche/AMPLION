import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import { trackEvent } from '../../lib/analytics';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface QuizFormData {
  email: string;
  business_type: string;
  current_challenges: string;
  automation_goals: string;
  company_size: string;
  current_tools: string;
  budget_range: string;
  timeline: string;
  additional_notes: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: 'business_type',
    question: 'What type of business do you run?',
    type: 'radio',
    options: ['E-commerce', 'SaaS', 'Professional Services', 'Agency', 'Other'],
  },
  {
    id: 'current_challenges',
    question: 'What are your biggest operational challenges right now?',
    type: 'textarea',
    placeholder: 'e.g., Too much manual data entry, slow customer response times, inefficient reporting...',
  },
  {
    id: 'automation_goals',
    question: 'Which areas would you like to automate first?',
    type: 'textarea',
    placeholder: 'e.g., Customer communication, data entry, reporting, marketing, sales...',
  },
  {
    id: 'company_size',
    question: "What's your current team size?",
    type: 'radio',
    options: ['1-5', '6-20', '21-50', '51+'],
  },
  {
    id: 'current_tools',
    question: 'What tools/software do you currently use?',
    type: 'textarea',
    placeholder: 'e.g., CRM (Salesforce), Email (Mailchimp), Project Management (Asana)...',
  },
  {
    id: 'budget_range',
    question: "What's your monthly budget for automation solutions?",
    type: 'radio',
    options: ['Under $1k', '$1k-$3k', '$3k-$5k', '$5k-$10k', '$10k+', 'Custom'],
  },
  {
    id: 'timeline',
    question: "What's your timeline for implementation?",
    type: 'radio',
    options: ['Urgent - within 1 month', '1-3 months', '3-6 months', 'Exploring options'],
  },
  {
    id: 'additional_notes',
    question: 'Tell us more about your automation goals',
    type: 'textarea',
    placeholder: 'Share any additional details about what you want to achieve...',
  },
];

// Function to calculate recommendation based on budget and company size
function calculateRecommendation(data: QuizFormData): { 
  recommendation: string; 
  recommendationText: string;
  score: number;
} {
  let score = 0;
  let recommendation = 'automation-essentials';
  let recommendationText = '';

  // Score based on budget
  const budgetScores: Record<string, number> = {
    'Under $1k': 1,
    '$1k-$3k': 2,
    '$3k-$5k': 3,
    '$5k-$10k': 4,
    '$10k+': 5,
    'Custom': 5,
  };
  score += budgetScores[data.budget_range] || 1;

  // Score based on company size
  const sizeScores: Record<string, number> = {
    '1-5': 1,
    '6-20': 2,
    '21-50': 3,
    '51+': 4,
  };
  score += sizeScores[data.company_size] || 1;

  // Score based on timeline urgency
  const timelineScores: Record<string, number> = {
    'Urgent - within 1 month': 3,
    '1-3 months': 2,
    '3-6 months': 1,
    'Exploring options': 0,
  };
  score += timelineScores[data.timeline] || 0;

  // Determine recommendation based on total score
  if (score <= 3) {
    recommendation = 'ai-creative-starter';
    recommendationText = 'Based on your responses, our AI Creative Starter package is perfect for you. This solution provides essential AI-powered creative tools to help automate your content and design needs without overwhelming complexity.';
  } else if (score <= 5) {
    recommendation = 'automation-essentials';
    recommendationText = 'Your business is ready for our Automation Essentials package. This comprehensive solution will streamline your operations with powerful workflow automation, perfect for your current scale and budget.';
  } else if (score <= 7) {
    recommendation = 'automation-power';
    recommendationText = 'Based on your needs and scale, our Automation Power Pack is ideal. This advanced solution combines sophisticated automation workflows with AI capabilities to transform your business operations.';
  } else if (score <= 9) {
    recommendation = 'managed-growth';
    recommendationText = 'Your business requires our Managed Growth Package. This premium solution provides dedicated support and custom automation strategies to accelerate your growth trajectory.';
  } else {
    recommendation = 'enterprise-amplification';
    recommendationText = 'Your organization needs our Enterprise Amplification solution. This comprehensive package delivers enterprise-grade automation, AI integration, and dedicated strategic consulting to transform your operations at scale.';
  }

  return { recommendation, recommendationText, score };
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<QuizFormData>();

  const totalSteps = questions.length + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true);
    try {
      // Calculate recommendation
      const { recommendation, recommendationText, score } = calculateRecommendation(data);

      // First, check if subscriber exists or create new one
      const { data: subscriberData, error: subscriberError } = await supabase
        .from('subscribers')
        .upsert({
          email: data.email,
          source: 'quiz',
          status: 'active'
        }, {
          onConflict: 'email'
        })
        .select()
        .single();

      if (subscriberError) {
        console.error('Subscriber error:', subscriberError);
        // Continue even if subscriber creation fails - quiz can still be saved
      }

      // Prepare quiz answers in the correct format
      const quizAnswers = {
        business_type: data.business_type,
        current_challenges: data.current_challenges,
        automation_goals: data.automation_goals,
        company_size: data.company_size,
        current_tools: data.current_tools,
        budget_range: data.budget_range,
        timeline: data.timeline
      };

      // Insert quiz results with correct schema
      const { data: quizData, error: quizError } = await supabase
        .from('quiz_results')
        .insert({
          email: data.email,
          subscriber_id: subscriberData?.id || null,
          answers: quizAnswers, // Store all answers as JSON
          recommendation: recommendation,
          recommendation_text: recommendationText,
          score: score,
          quiz_version: 'v1',
          additional_notes: data.additional_notes || null,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (quizError) {
        console.error('Quiz submission error:', quizError);
        throw quizError;
      }

      // Track successful completion
      await trackEvent({
        event_name: 'quiz_completed',
        event_category: 'conversion',
        user_email: data.email,
        event_data: {
          business_type: data.business_type,
          budget_range: data.budget_range,
          timeline: data.timeline,
          recommendation: recommendation,
          score: score
        },
      });

      toast.success('Thank you! Redirecting to your personalized roadmap...');
      onClose();
      
      // Navigate to results page
      if (quizData?.id) {
        navigate(`/quiz-result/${quizData.id}`);
      } else {
        // Fallback to home with success message
        navigate('/?quiz=completed');
      }
    } catch (error) {
      console.error('Quiz submission error:', error);
      
      // Log error for debugging
      await trackEvent({
        event_name: 'quiz_submission_error',
        event_category: 'error',
        event_data: {
          error: error instanceof Error ? error.message : 'Unknown error',
          step: currentStep + 1
        },
      });
      
      toast.error('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      trackEvent({
        event_name: 'quiz_step_completed',
        event_category: 'engagement',
        event_data: { step: currentStep + 1 },
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    trackEvent({
      event_name: 'quiz_abandoned',
      event_category: 'engagement',
      event_data: { step: currentStep + 1 },
    });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-navy rounded-2xl p-8 z-50 border-2 border-cyan/30">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold text-white">
                Your Custom Automation Roadmap
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </Dialog.Close>
            </div>

            <div className="w-full bg-deepBg rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan to-orange rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep < questions.length ? (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {questions[currentStep].question}
                  </h3>

                  {questions[currentStep].type === 'radio' && (
                    <div className="space-y-3">
                      {questions[currentStep].options?.map((option) => (
                        <label
                          key={option}
                          className="flex items-center p-4 bg-deepBg rounded-lg border border-cyan/20 hover:border-cyan cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            value={option}
                            {...register(questions[currentStep].id as keyof QuizFormData, {
                              required: 'This field is required',
                            })}
                            className="mr-3 h-4 w-4 text-cyan focus:ring-cyan"
                          />
                          <span className="text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {questions[currentStep].type === 'textarea' && (
                    <textarea
                      {...register(questions[currentStep].id as keyof QuizFormData, {
                        required: questions[currentStep].id !== 'additional_notes' ? 'This field is required' : false,
                      })}
                      placeholder={questions[currentStep].placeholder}
                      rows={4}
                      className="w-full px-4 py-3 bg-deepBg border border-cyan/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan focus:outline-none"
                    />
                  )}

                  {errors[questions[currentStep].id as keyof QuizFormData] && (
                    <p className="text-red-400 text-sm mt-2">
                      {errors[questions[currentStep].id as keyof QuizFormData]?.message}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Get Your Personalized Roadmap
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Email *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className="w-full px-4 py-3 bg-deepBg border border-cyan/30 rounded-lg text-white focus:border-cyan focus:outline-none"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="h-5 w-5" />
                  Previous
                </Button>
              )}

              {currentStep < questions.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!watch(questions[currentStep].id as keyof QuizFormData)}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="h-5 w-5" />
                </Button>
              ) : (
                <Button type="submit" isLoading={isSubmitting} className="ml-auto">
                  Submit & Get Your Roadmap
                  <ArrowRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
