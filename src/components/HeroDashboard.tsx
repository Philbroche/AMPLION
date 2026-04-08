/**
 * HeroDashboard — Scroll-driven KPI before/after dashboard for AMPLION hero section
 *
 * INSTALLATION:
 *   npm install gsap
 *
 * IMPORT & USAGE:
 *   import { HeroDashboard } from '../components/HeroDashboard';
 *   <HeroDashboard />
 *
 * The component is fully self-contained (fonts, CSS, animation).
 * Do NOT wrap it in a dark background — the parent section provides that.
 *
 * ANIMATION SEQUENCE (scroll-driven):
 *   1. Cards stagger-reveal on mount (GSAP, ~1s)
 *   2. As the user scrolls down through the hero, KPI values animate
 *      red → green, column by column, in sync with a scan line
 *   3. Scrolling back up reverses the animation (green → red)
 */

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language, translations } from '../translations';

gsap.registerPlugin(ScrollTrigger);

// ─── KPI raw data (language-independent) ─────────────────────────────────────
const KPI_RAW = [
  { bRaw: 0.8,  aRaw: 4.2,  type: 'percent' as const },
  { bRaw: 14,   aRaw: 97,   type: 'count'   as const },
  { bRaw: 252,  aRaw: 4,    type: 'time'    as const },
  { bRaw: 2,    aRaw: 23,   type: 'hours'   as const },
  { bRaw: 144,  aRaw: 3,    type: 'time'    as const },
  { bRaw: 480,  aRaw: 148,  type: 'money'   as const },
];

function buildKpis(language: Language) {
  const { kpis, units } = translations[language].dashboard;
  return KPI_RAW.map((raw, i) => ({
    label: kpis[i].label,
    tier:  kpis[i].tier,
    bRaw:  raw.bRaw,
    aRaw:  raw.aRaw,
    fmt: (v: number) => {
      switch (raw.type) {
        case 'percent': return v.toFixed(1) + '%';
        case 'count':   return Math.round(v).toString();
        case 'time':    return v >= 60 ? (v / 60).toFixed(1) + units.hrs : Math.round(v) + units.min;
        case 'hours':   return Math.round(v) + units.hrs;
        case 'money':   return '$' + Math.round(v);
      }
    },
  }));
}

interface HeroDashboardProps {
  pinRef?: RefObject<HTMLElement>;
  onProgress?: (p: number) => void;
  language?: Language;
}

export function HeroDashboard({ pinRef, onProgress, language = 'en' }: HeroDashboardProps = {}) {
  const KPIS = buildKpis(language);
  // Keep a ref to always-current KPIS so the ScrollTrigger closure uses the latest language
  const kpisRef = useRef(KPIS);
  kpisRef.current = KPIS;

  const wrapperRef      = useRef<HTMLDivElement>(null);
  const scanRef         = useRef<HTMLDivElement>(null);
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const headerLabelRef  = useRef<HTMLSpanElement>(null);
  const dotRef          = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // ── Set initial opacity + values imperatively so React re-renders don't reset them ──
    cardRefs.current.forEach(el => { if (el) el.style.opacity = '0'; });
    valueRefs.current.forEach((el, i) => {
      if (el) el.textContent = kpisRef.current[i].fmt(kpisRef.current[i].bRaw);
    });

    // ── Stagger reveal cards on mount ──────────────────────────────────────
    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out', delay: 0.25 }
    );

    // ── Scroll-driven scan + value animation ───────────────────────────────
    // Trigger: hero top hits viewport top → hero bottom hits viewport top.
    // scrub: 0.8 adds a smooth ~0.8s lag so rapid scrolling feels cinematic.
    const st = ScrollTrigger.create({
      trigger: pinRef?.current ?? undefined,
      start: 'top top',
      end: '+=600',
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate(self) {
        const p = self.progress;
        const isMobile    = window.innerWidth < 768;
        const numCols     = isMobile ? 2 : 3;
        const colTriggers = isMobile ? [0, 0.50] : [0, 0.36, 0.68];

        // Move scan line with scroll progress
        if (scanRef.current) {
          scanRef.current.style.opacity = p > 0.005 && p < 0.995 ? '1' : '0';
          scanRef.current.style.left = `calc(${p * 100}% + ${p * 4}px)`;
        }

        // Update each KPI value — handles both forward and reverse scroll
        kpisRef.current.forEach((kpi, i) => {
          const col     = i % numCols;
          const trigger = colTriggers[col];
          const valEl   = valueRefs.current[i];
          const cardEl  = cardRefs.current[i];

          if (p < trigger) {
            // Scan hasn't reached this column yet — show red "before" state
            if (valEl) {
              valEl.textContent      = kpi.fmt(kpi.bRaw);
              valEl.style.color      = '#ff3347';
              valEl.style.textShadow = '0 0 14px rgba(255,51,71,0.5)';
            }
            if (cardEl) {
              cardEl.style.borderColor = 'rgba(255,51,71,0.75)';
              cardEl.style.boxShadow   = '0 0 30px rgba(255,51,71,0.45), inset 0 0 30px rgba(255,51,71,0.10)';
            }
            return;
          }

          const local = Math.min((p - trigger) / (1 - trigger + 0.001), 1);
          const eased = 1 - Math.pow(1 - local, 3); // easeOutCubic
          const cur   = kpi.bRaw + (kpi.aRaw - kpi.bRaw) * eased;

          if (valEl) valEl.textContent = kpi.fmt(cur);

          // Flip between red and green based on per-column progress
          if (eased > 0.45) {
            if (valEl) {
              valEl.style.color      = '#00e676';
              valEl.style.textShadow = '0 0 18px rgba(0,230,118,0.55)';
            }
            if (cardEl) {
              cardEl.style.borderColor = 'rgba(0,230,118,0.75)';
              cardEl.style.boxShadow   = '0 0 30px rgba(0,230,118,0.45), inset 0 0 30px rgba(0,230,118,0.10)';
            }
          } else {
            if (valEl) {
              valEl.style.color      = '#ff3347';
              valEl.style.textShadow = '0 0 14px rgba(255,51,71,0.5)';
            }
            if (cardEl) {
              cardEl.style.borderColor = 'rgba(255,51,71,0.75)';
              cardEl.style.boxShadow   = '0 0 30px rgba(255,51,71,0.45), inset 0 0 30px rgba(255,51,71,0.10)';
            }
          }
        });

        // Header label and dot turn green when overall cycle reaches 60%
        const headerEl = headerLabelRef.current;
        if (headerEl) {
          if (p >= 0.6) {
            headerEl.style.color      = '#00e676';
            headerEl.style.textShadow = '0 0 8px rgba(0,230,118,0.5)';
          } else {
            headerEl.style.color      = '#ff3347';
            headerEl.style.textShadow = '0 0 8px rgba(255,51,71,0.5)';
          }
        }

        onProgress?.(p);

        const dotEl = dotRef.current;
        if (dotEl) {
          if (p >= 0.6) {
            dotEl.style.background  = '#00e676';
            dotEl.style.boxShadow   = '0 0 6px rgba(0,230,118,0.8), 0 0 14px rgba(0,230,118,0.4)';
          } else {
            dotEl.style.background  = '#ff3347';
            dotEl.style.boxShadow   = '0 0 6px rgba(255,51,71,0.8), 0 0 14px rgba(255,51,71,0.4)';
          }
        }
      },
    });

    return () => st.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-sync animation state when language changes ──────────────────────
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [language]);

  return (
    <>
      {/* ── Self-contained fonts + styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Syne:wght@400;500&display=swap');

        .amp-dashboard {
          background: #080812;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
          position: relative;
          padding: 20px;
        }

        .amp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .amp-header-label {
          font-family: 'Syne', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
        }

        .amp-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff3347;
          box-shadow: 0 0 6px rgba(255,51,71,0.8), 0 0 14px rgba(255,51,71,0.4);
          animation: amp-pulse 1.8s ease-in-out infinite;
        }

        @keyframes amp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }

        .amp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 767px) {
          .amp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .amp-card {
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,51,71,0.22);
          border-radius: 10px;
          padding: 14px 16px;
          transition: border-color 0.1s linear;
        }

        .amp-tier {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 400;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 4px;
        }

        .amp-label {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 400;
          font-size: 11px;
          color: rgba(255,255,255,0.42);
          margin-bottom: 14px;
        }

        .amp-value {
          display: block;
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          font-size: clamp(18px, 2.2vw, 26px);
          color: #ff3347;
          text-shadow: 0 0 14px rgba(255,51,71,0.5);
          transition: none;
          line-height: 1;
        }

        .amp-scan {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: rgba(255,255,255,0.96);
          box-shadow:
            0 0 10px rgba(255,255,255,0.9),
            0 0 35px rgba(80,200,255,0.7),
            0 0 80px rgba(0,150,255,0.35);
          pointer-events: none;
          opacity: 0;
        }
      `}</style>

      {/* ── Dashboard wrapper ── */}
      <div className="amp-dashboard" ref={wrapperRef}>

        {/* KPI grid */}
        <div className="amp-grid">
          {KPIS.map((kpi, i) => (
            <div
              key={kpi.label}
              className="amp-card"
              ref={el => { cardRefs.current[i] = el; }}
            >
              <span className="amp-tier">{kpi.tier}</span>
              <span className="amp-label">{kpi.label}</span>
              <span
                className="amp-value"
                ref={el => { valueRefs.current[i] = el; }}
              />
            </div>
          ))}
        </div>

        {/* Scan line — position driven by scroll progress */}
        <div className="amp-scan" ref={scanRef} />
      </div>
    </>
  );
}
