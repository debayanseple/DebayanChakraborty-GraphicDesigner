import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '../data/profile';
import Sticker from './Sticker';
import '../styles/about.css';

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <motion.div
          className="polaroid-wrap"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="polaroid">
            <span className="washi-about" aria-hidden="true" />
            <img src={profile.aboutPortrait || profile.portrait} alt={`${profile.name} portrait`} />
            <span className="polaroid-caption">{profile.name}</span>
          </div>
          <Sticker emoji="👽" top="-2%" right="-6%" rotate={12} drag />
          <Sticker emoji="😄" bottom="8%" left="-8%" rotate={-14} drag />
          <Sticker label="Hi" top="42%" right="-12%" rotate={18} drag />
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="section-kicker">Hello!</p>
          <h2 className="section-title">About Me</h2>
          <p className="about-bio">{profile.bio}</p>

          <div className="about-stats">
            {profile.stats.map((s) => (
              <div key={s.label}>
                <div className="stat-value">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <a href="#experience" className="btn btn-ghost">
            My Story
          </a>
        </motion.div>
      </div>
    </section>
  );
}
