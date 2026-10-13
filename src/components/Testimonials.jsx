import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import Marquee from './Marquee';
import '../styles/testimonials.css';

const AVATAR_COLORS = ['#ff7a1a', '#ff3d8b', '#2bb8ff', '#ffd84a', '#3ddc84'];

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ t }) {
  const color = AVATAR_COLORS[t.name.length % AVATAR_COLORS.length];
  return (
    <article className="testimonial-card">
      <p className="testimonial-quote">{t.quote}</p>
      <div className="testimonial-author">
        <span className="testimonial-avatar" style={{ background: color }} aria-hidden="true">
          {initials(t.name)}
        </span>
        <div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-role">{t.role}</div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="section section-dark" id="testimonials">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">Testimonials</p>
          <h2 className="section-title">What My Clients Say</h2>
          <p className="section-intro">
            Here's what my clients have shared about their experiences working
            with me. Their trust and satisfaction motivate me to continue
            delivering designs that make an impact.
          </p>
        </motion.div>
      </div>

      <div className="testimonials-marquee">
        <Marquee
          items={testimonials}
          duration={55}
          ariaLabel="Client testimonials"
          renderItem={(t) => <TestimonialCard t={t} />}
        />
      </div>
    </section>
  );
}
