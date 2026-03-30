import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

export function Footer() {
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
                <button
                  onClick={() => (window as any).Calendly.initPopupWidget({
                    url: 'https://calendly.com/philb-prog17/demo-call'
                  })}
                  className="text-gray-300 hover:text-cyan transition-colors text-sm text-left"
                >
                  Contact
                </button>
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
            <h3 className="text-cyan font-semibold mb-4">Get In Touch</h3>
            <p className="text-gray-300 text-sm mb-3">
              Ready to talk? Book a free 15-minute strategy call or reach out directly.
            </p>
            <button
              onClick={() => (window as any).Calendly.initPopupWidget({
                url: 'https://calendly.com/philb-prog17/demo-call'
              })}
              className="inline-block mb-3 text-cyan hover:underline text-sm font-medium text-left"
            >
              Book a Free Strategy Call →
            </button>
            <br />
            <a
              href="mailto:Pbrochu@amplion.dev"
              className="text-gray-300 hover:text-cyan transition-colors text-sm"
            >
              Pbrochu@amplion.dev
            </a>
          </div>
        </div>

        <div className="border-t border-cyan/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-gray-400 text-xs text-center mb-4">
              AMPLION · amplion.dev · Serving businesses across North America
            </p>
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 <span className="text-orange">Amplion</span>. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://amplion.dev"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://amplion.dev"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://amplion.dev"
              className="text-gray-400 hover:text-cyan transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="mailto:Pbrochu@amplion.dev"
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
