import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/profile';
import Sticker from './Sticker';
import '../styles/hero.css';

function StarDoodle({ color = '#ff7a1a', size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 2 L23 16 L38 20 L23 24 L20 38 L17 24 L2 20 L17 16 Z"
        fill={color}
      />
    </svg>
  );
}

function SparkDoodle({ color = '#2bb8ff', size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0 C17 10 22 15 32 16 C22 17 17 22 16 32 C15 22 10 17 0 16 C10 15 15 10 16 0 Z"
        fill={color}
      />
    </svg>
  );
}

function BurstDoodle({ color = '#ff3d8b', size = 54 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path
        d="M30 4 L35 22 L54 14 L40 30 L56 40 L36 38 L34 56 L26 40 L8 48 L20 32 L4 24 L24 22 Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

function ScribbleDoodle() {
  return (
    <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
      <path
        d="M4 18 C18 6, 30 26, 45 14 S 72 8, 86 18"
        stroke="#ff7a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Keep parallax subtle/disabled on mobile for smoother scrolling & less jank
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -20 : -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -24 : -140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -12 : -50]);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.12 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="hero" id="home" ref={ref}>
      {/* Floating doodles — outer: parallax, inner: gentle bob */}
      <motion.div className="hero-doodle" style={{ y: y1, top: '16%', left: '6%' }}>
        <motion.div
          className="hero-doodle-inner doodle-star"
          animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <StarDoodle />
        </motion.div>
      </motion.div>
      <motion.div className="hero-doodle" style={{ y: y2, top: '24%', right: '10%' }}>
        <motion.div
          className="hero-doodle-inner doodle-spark"
          animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <SparkDoodle />
        </motion.div>
      </motion.div>
      <motion.div className="hero-doodle" style={{ y: y1, bottom: '28%', left: '12%' }}>
        <motion.div
          className="hero-doodle-inner doodle-burst"
          animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <BurstDoodle />
        </motion.div>
      </motion.div>
      <motion.div className="hero-doodle" style={{ y: y3, top: '58%', right: '6%' }}>
        <motion.div
          className="hero-doodle-inner doodle-scribble"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <ScribbleDoodle />
        </motion.div>
      </motion.div>
      <motion.div className="hero-doodle" style={{ y: y2, bottom: '34%', right: '22%' }}>
        <motion.div
          className="hero-doodle-inner doodle-spark"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        >
          <SparkDoodle color="#ffd84a" size={20} />
        </motion.div>
      </motion.div>

      <Sticker label="Hi!" top="18%" left="42%" rotate={-12} className="hero-hi" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Portfolio / {new Date().getFullYear()}</p>

          <p className="hero-name">{profile.name}</p>

          <h1 className="hero-title">
            <span className="hero-title-line">
              <span className="ellipse-wrap">
                Graphic
                <svg className="ellipse-svg" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M150 8 C 60 8, 12 30, 14 52 C 16 78, 90 94, 160 92 C 240 90, 292 70, 288 46 C 284 20, 220 8, 150 8 C 120 8, 90 14, 70 24" />
                </svg>
              </span>
            </span>
            <span className="hero-title-line">
              Desi<span className="scribble-letter">g</span>ner
            </span>
          </h1>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-disciplines">
            {profile.disciplines.map((d, i) => (
              <span key={d}>
                {i > 0 && <span className="sep"> ✦ </span>}
                {d}
              </span>
            ))}
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let's Talk
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap">
          <span className="washi" aria-hidden="true" />
          <img
            className="hero-portrait"
            src={profile.portrait}
            alt={`${profile.name}, graphic designer`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="680"
            height="850"
            sizes="(max-width: 380px) 72vw, (max-width: 600px) 68vw, (max-width: 900px) 64vw, 340px"
          />
          <Sticker emoji="👽" top="-4%" right="-8%" rotate={14} />
          <Sticker emoji="😄" bottom="6%" left="-10%" rotate={-10} />
        </div>
      </div>

      {/* Torn paper edge — code-based textured medium-shadow rip */}
      <svg
        className="torn-edge"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="tearFiber" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0"
              in="n"
              result="nAlpha"
            />
          </filter>
          <linearGradient id="paperHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8dfcc" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path
          className="torn-shadow"
          d="M0 110 L0 58 L48 65 L96 48 L160 68 L220 42 L280 62 L340 38 L400 60 L470 34 L540 56 L610 30 L680 54 L750 28 L820 52 L890 32 L960 58 L1030 36 L1100 60 L1170 40 L1240 64 L1310 44 L1380 66 L1440 50 L1440 110 Z"
        />
        <path
          className="torn-main"
          d="M0 58 L48 65 L96 48 L160 68 L220 42 L280 62 L340 38 L400 60 L470 34 L540 56 L610 30 L680 54 L750 28 L820 52 L890 32 L960 58 L1030 36 L1100 60 L1170 40 L1240 64 L1310 44 L1380 66 L1440 50 L1440 54 L1380 70 L1310 48 L1240 68 L1170 44 L1100 64 L1030 40 L960 62 L890 36 L820 56 L750 32 L680 58 L610 34 L540 60 L470 38 L400 64 L340 42 L280 66 L220 46 L160 72 L96 52 L48 69 L0 62 Z"
          fill="url(#paperHighlight)"
        />
        <g className="torn-grain" filter="url(#tearFiber)">
          <path d="M0 110 L0 58 L48 65 L96 48 L160 68 L220 42 L280 62 L340 38 L400 60 L470 34 L540 56 L610 30 L680 54 L750 28 L820 52 L890 32 L960 58 L1030 36 L1100 60 L1170 40 L1240 64 L1310 44 L1380 66 L1440 50 L1440 110 Z" />
        </g>
      </svg>
    </section>
  );
}
