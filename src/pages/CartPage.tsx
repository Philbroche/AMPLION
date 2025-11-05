import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { DiscountCode } from '../types';
import toast from 'react-hot-toast';
import { trackPageView, trackEvent } from '../lib/analytics';

export function CartPage() {
  const { items, removeItem, updateQuantity, discountCode, applyDiscount, removeDiscount, subtotal, discountAmount, total } = useCart();
  const [discountInput, setDiscountInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('cart');
  }, []);

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;

    setIsValidating(true);
    try {
      const { data, error } = await supabase
        .from('discount_codes')
        .select('*')
        .eq('code', discountInput.toUpperCase())
        .eq('active', true)
        .maybeSingle();

      if (error || !data) {
        toast.error('Invalid discount code');
        return;
      }

      const code = data as DiscountCode;

      if (code.expires_at && new Date(code.expires_at) < new Date()) {
        toast.error('This discount code has expired');
        return;
      }

      if (code.max_uses && code.times_used >= code.max_uses) {
        toast.error('This discount code has reached its usage limit');
        return;
      }

      if (code.minimum_purchase > subtotal) {
        toast.error(`Minimum purchase of $${code.minimum_purchase} required`);
        return;
      }

      applyDiscount(code);
      toast.success(`Discount code applied! Save $${discountAmount.toFixed(2)}`);
      trackEvent({
        event_name: 'discount_applied',
        event_category: 'conversion',
        event_data: { code: code.code, discount_value: code.discount_value },
      });
      setDiscountInput('');
    } catch (error) {
      toast.error('Failed to validate discount code');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveDiscount = () => {
    removeDiscount();
    toast.success('Discount code removed');
  };

  const handleCheckout = () => {
    trackEvent({
      event_name: 'checkout_initiated',
      event_category: 'conversion',
      event_data: { cart_value: total, item_count: items.length },
    });
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-navy mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Explore our automation solutions to get started</p>
            <Link to="/portfolio">
              <Button size="lg">Browse Products</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-navy mb-8 font-heading"
        >
          Shopping <span className="text-orange">Cart</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.product_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-navy mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-orange">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          removeItem(item.product_id);
                          toast.success('Item removed from cart');
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-600">Line total:</span>
                    <span className="text-xl font-bold text-navy">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-navy to-deepBg rounded-2xl p-6 border-2 border-cyan/30 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                {discountCode && (
                  <div className="flex justify-between items-center text-green-400">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>{discountCode.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-cyan/20">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-cyan">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {!discountCode && (
                <div className="mb-6">
                  <label className="block text-white text-sm font-medium mb-2">
                    Have a discount code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountInput}
                      onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                      placeholder="ENTER CODE"
                      className="flex-1 px-4 py-2 bg-deepBg border border-cyan/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan focus:outline-none"
                    />
                    <Button
                      onClick={handleApplyDiscount}
                      isLoading={isValidating}
                      size="sm"
                      disabled={!discountInput.trim()}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}

              <Button onClick={handleCheckout} size="lg" className="w-full">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>

              <Link to="/portfolio">
                <button className="w-full mt-4 text-cyan hover:text-white transition-colors text-center">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
