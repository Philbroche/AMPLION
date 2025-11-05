import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { trackPageView, trackEvent } from '../lib/analytics';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

export function CheckoutPage() {
  const { items, discountCode, subtotal, discountAmount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    trackPageView('checkout');
  }, [items, navigate]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      const orderNumber = `AMP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const { data: orderData, error } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          email: data.email,
          items: items,
          subtotal: subtotal,
          discount_code: discountCode?.code || null,
          discount_amount: discountAmount,
          tax: 0,
          total: total,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      await trackEvent({
        event_name: 'order_created',
        event_category: 'conversion',
        user_email: data.email,
        event_data: {
          order_number: orderNumber,
          total: total,
          item_count: items.length,
        },
      });

      clearCart();
      toast.success('Order created successfully!');
      navigate(`/order-success/${orderData.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-navy mb-8 font-heading text-center"
        >
          Secure <span className="text-orange">Checkout</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-navy mb-6">Contact Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan focus:outline-none"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan focus:outline-none"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan focus:outline-none"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('company')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan focus:outline-none"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan focus:outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Lock className="h-4 w-4" />
                <span>Your information is secure and encrypted</span>
              </div>

              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                <CreditCard className="h-5 w-5" />
                Complete Order - ${total.toFixed(2)}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-navy to-deepBg rounded-2xl p-6 border-2 border-cyan/30 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-gray-300">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-cyan/20 pt-4 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                {discountCode && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({discountCode.code})</span>
                    <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-cyan/20">
                  <span>Total</span>
                  <span className="text-cyan">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
