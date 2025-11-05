import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { trackPageView } from '../lib/analytics';

interface QuizData {
  email: string;
  business_type: string;
  current_challenges: string;
  automation_goals: string;
  company_size: string;
  budget_range: string;
  timeline: string;
}

export function QuizResultPage() {
  const { id } = useParams();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView('quiz_result');
    loadQuizData();
  }, [id]);

  const loadQuizData = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_responses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setQuizData(data);
    } catch (error) {
      console.error('Failed to load quiz data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-deepBg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-deepBg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Quiz results not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const timeline = [
    { step: 'Review within 24 hours', time: 'Day 1', description: 'Our team analyzes your responses' },
    { step: 'Custom strategy call', time: 'Day 2-3', description: 'Discuss your roadmap and answer questions' },
    { step: 'Proposal delivered', time: 'Day 4-5', description: 'Receive detailed plan and pricing' },
    { step: 'Implementation begins', time: 'Week 2', description: 'Start building your automation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepBg to-navy pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan/20 mb-6"
          >
            <CheckCircle className="h-10 w-10 text-cyan" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Thank You for Your Interest!
          </h1>
          <p className="text-xl text-gray-300">
            We're analyzing your automation opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan/30 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Information Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Business Type</p>
              <p className="text-white font-medium">{quizData.business_type}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Company Size</p>
              <p className="text-white font-medium">{quizData.company_size}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Budget Range</p>
              <p className="text-white font-medium">{quizData.budget_range}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Timeline</p>
              <p className="text-white font-medium">{quizData.timeline}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm mb-1">Automation Goals</p>
              <p className="text-white">{quizData.automation_goals}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-orange/30 mb-8"
        >
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-orange mr-3" />
            <h2 className="text-2xl font-bold text-white">What Happens Next</h2>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center text-cyan font-bold">
                    {index + 1}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-cyan/20 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm text-orange font-semibold mb-1">{item.time}</p>
                  <p className="text-white font-medium mb-1">{item.step}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-cyan to-orange rounded-2xl p-8 text-center mb-8"
        >
          <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Estimated ROI</h3>
          <p className="text-white/90 mb-4">
            Based on your team size and automation goals, you could save{' '}
            <span className="font-bold">15-25 hours per week</span> and reduce operational costs by{' '}
            <span className="font-bold">40-60%</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/portfolio">
            <Button size="lg">
              Explore Our Solutions
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
