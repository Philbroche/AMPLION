import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { trackEvent } from '../../lib/analytics';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from('subscribers').insert({
        email,
        status: 'pending',
      });

      if (error) throw error;

      await trackEvent({
        event_name: 'newsletter_signup',
        event_category: 'conversion',
        user_email: email,
      });

      toast.success('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('This email is already subscribed!');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src="/Sleek Circular Design for AMPLION (2).png" alt="Amplion" className="h-16 w-16 mb-4" />
            <p className="text-gray-300 text-sm">
              Amplifying Business Intelligence Through AI Automation
            </p>
          </div>

          <div>
            <h3 className="text-cyan font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-cyan transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-cyan transition-colors">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-cyan transition-colors">
                  AI-Powered Creative
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-gray-300 hover:text-cyan transition-colors">
                  Managed Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-cyan transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-cyan transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get weekly automation tips and insights
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-deepBg border border-cyan/30 focus:border-cyan focus:outline-none text-white"
                required
              />
              <Button type="submit" size="sm" isLoading={isLoading} className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-cyan/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 <span className="text-orange">Amplion</span>. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@amplion.ai"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
