import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroDashboard } from '../HeroDashboard';
import { trackClick } from '../../lib/analytics';
import { useBooking } from '../../context/BookingContext';

export function HeroSection() {
  const { openModal } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  const handleProgress = (p: number) => {
    const el = badgeRef.current;
    if (!el) return;
    if (p >= 0.6) {
      el.style.color           = '#00e676';
      el.style.borderColor     = 'rgba(0,230,118,0.35)';
      el.style.backgroundColor = 'rgba(0,230,118,0.10)';
    } else {
      el.style.color           = '#ff3347';
      el.style.borderColor     = 'rgba(255,51,71,0.35)';
      el.style.backgroundColor = 'rgba(255,51,71,0.10)';
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#080812]">

      {/*
        Scoped overrides — stretches the dashboard edge-to-edge as a full background
        and scales up the card content for cinematic impact.
      */}
      <style>{`
        .amp-hero-bg,
        .amp-hero-bg .amp-dashboard {
          width: 100%;
          height: 100%;
          border-radius: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }
        .amp-hero-bg .amp-dashboard {
          display: flex;
          flex-direction: column;
          padding: 96px 32px 32px;
        }
        .amp-hero-bg .amp-grid {
          flex: 1;
          grid-template-rows: repeat(2, 1fr);
          align-items: stretch;
          gap: 16px;
        }
        .amp-hero-bg .amp-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px 32px;
          border: 1px solid rgba(255,51,71,0.75);
          box-shadow: 0 0 30px rgba(255,51,71,0.45), inset 0 0 30px rgba(255,51,71,0.10);
        }
        .amp-hero-bg .amp-tier {
          display: none;
        }
        .amp-hero-bg .amp-label {
          font-size: 26px;
          margin-bottom: 16px;
          color: rgba(255,255,255,0.85);
        }
        .amp-hero-bg .amp-value {
          font-size: clamp(28px, 3.8vw, 52px);
        }
        .amp-hero-bg .amp-header {
          margin-bottom: 24px;
        }
        .amp-hero-bg .amp-header-label {
          font-size: 18px;
          letter-spacing: 0.18em;
        }
      `}</style>

      {/* Layer 0 — dashboard as full-bleed background (hidden on mobile) */}
      <div className="amp-hero-bg absolute inset-0 z-0 hidden sm:block">
        <HeroDashboard pinRef={sectionRef} onProgress={handleProgress} />
      </div>

      {/* Layer 1 — fully transparent at top/bottom edges so card frames show, heavier at text centre */}
      <div
        className="absolute inset-0 z-[1] hidden sm:block"
        style={{
          background: 'linear-gradient(to bottom, rgba(8,8,18,0) 0%, rgba(8,8,18,0) 12%, rgba(8,8,18,0.68) 38%, rgba(8,8,18,0.72) 50%, rgba(8,8,18,0.68) 62%, rgba(8,8,18,0) 88%, rgba(8,8,18,0) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] sm:hidden"
        style={{
          background: 'rgba(8,8,18,0.88)',
        }}
      />

      {/* Layer 2 — badge, headline, subheadline, CTA */}
      <div className="relative z-[2] min-h-screen flex flex-col items-center justify-center text-center w-full px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-6"
          >
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold tracking-wide"
              style={{ color: '#ff3347', borderColor: 'rgba(255,51,71,0.35)', backgroundColor: 'rgba(255,51,71,0.10)' }}
            >
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span>AI Automation for Growing Businesses</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_30px_rgba(0,229,255,0.25)]">
              Less Manual Work. More Time. More Money.
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We design and build custom AI automation systems that eliminate bottlenecks, cut operational costs, and free your team to focus on what actually grows the business. Book a free call — we'll map out exactly what we'd build.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  trackClick('hero_cta_primary', 'button');
                  openModal();
                }}
                className="motion-safe:animate-pulse-glow w-full sm:w-auto"
              >
                Get Your Free Automation Audit →
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
