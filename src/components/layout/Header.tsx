import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-deepBg/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center h-24 -my-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src="/Sleek Circular Design for AMPLION (2).png"
              alt="Amplion - AI Automation Developer"
              className="h-full w-auto transition-transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <button
              onClick={() => scrollTo('hero')}
              className="text-lg text-white hover:text-cyan transition-colors duration-300 font-medium relative group min-h-[44px]"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="text-lg text-white hover:text-cyan transition-colors duration-300 font-medium relative group min-h-[44px]"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-lg text-white hover:text-cyan transition-colors duration-300 font-medium relative group min-h-[44px]"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={openModal}
              className="text-lg text-white hover:text-cyan transition-colors duration-300 font-medium relative group min-h-[44px]"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-cyan/20"
          >
            <nav className="px-4 py-6 space-y-2" aria-label="Mobile navigation">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => scrollTo('hero'), 320);
                }}
                className="block text-lg text-white hover:text-cyan transition-colors duration-300 font-medium py-3 text-left w-full min-h-[44px]"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => scrollTo('services'), 320);
                }}
                className="block text-lg text-white hover:text-cyan transition-colors duration-300 font-medium py-3 text-left w-full min-h-[44px]"
              >
                Services
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => scrollTo('faq'), 320);
                }}
                className="block text-lg text-white hover:text-cyan transition-colors duration-300 font-medium py-3 text-left w-full min-h-[44px]"
              >
                FAQs
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="block text-lg text-white hover:text-cyan transition-colors duration-300 font-medium py-3 text-left w-full min-h-[44px]"
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
