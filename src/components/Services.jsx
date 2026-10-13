import { motion } from 'framer-motion';
import { services } from '../data/services';
import '../styles/services.css';

const card = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

function onMouseMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function Services() {
  return (
    <section className="section section-dark" id="services">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">Services</p>
          <h2 className="section-title">What I Can Do For You</h2>
          <p className="section-intro">
            As a digital designer, I am a visual storyteller, crafting
            experiences that connect deeply and spark creativity.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              className="service-card"
              variants={card}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8 }}
              onMouseMove={onMouseMove}
            >
              <span className="service-num">{s.number}</span>
              <h3 className="service-title">{s.title}</h3>
              <ul className="service-items">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
