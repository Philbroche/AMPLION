import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { trackPageView } from '../lib/analytics';

export function OrderSuccessPage() {
  const { id } = useParams();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    trackPageView('order_success');
    loadOrderData();
  }, [id]);

  const loadOrderData = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('order_number, email')
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrderNumber(data.order_number);
      setEmail(data.email);
    } catch (error) {
      console.error('Failed to load order data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deepBg to-navy flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-navy/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-2 border-cyan/30 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan to-orange mb-6"
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your purchase. We're excited to help amplify your business!
          </p>

          {orderNumber && (
            <div className="bg-deepBg rounded-xl p-6 mb-8 border border-cyan/20">
              <p className="text-gray-400 text-sm mb-2">Order Number</p>
              <p className="text-2xl font-bold text-cyan">{orderNumber}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-orange/20 to-cyan/20 rounded-xl p-6 mb-8 border border-orange/30">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-white font-bold mb-2">What's Next?</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>✓ Confirmation email sent to {email || 'your email'}</li>
                  <li>✓ Our team will contact you within 24 hours</li>
                  <li>✓ We'll schedule your onboarding call</li>
                  <li>✓ Implementation begins within 2-3 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link to="/portfolio">
              <Button size="lg" className="w-full">
                Browse More Solutions
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
