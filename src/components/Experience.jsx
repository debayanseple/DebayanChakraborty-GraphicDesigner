import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import '../styles/experience.css';

export default function Experience() {
  return (
    <section className="section section-dark" id="experience">
      <div className="container">
        <motion.div
          className="section-head"
          style={{ marginInline: 'auto', textAlign: 'center' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker" style={{ justifyContent: 'center' }}>
            Journey
          </p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <div className="timeline">
          {experience.map((job, i) => (
            <motion.div
              key={job.role + job.company}
              className="timeline-item"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="timeline-dot" aria-hidden="true" />
              <span className="timeline-period">{job.period}</span>
              <h3 className="timeline-role">{job.role}</h3>
              <p className="timeline-company">{job.company}</p>
              {job.description ? <p className="timeline-desc">{job.description}</p> : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
