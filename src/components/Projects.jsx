import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { projects, projectCategories } from '../data/projects';
import '../styles/projects.css';

function Lightbox({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="lightbox"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox-close" onClick={onClose} aria-label="Close project">
          <FiX />
        </button>
        <img src={project.image} alt={project.title} />
        <div className="lightbox-body">
          <p className="lightbox-category">{project.category}</p>
          <h3 className="lightbox-title">{project.title}</h3>
          <p className="lightbox-desc">{project.description}</p>
          <div className="lightbox-tools">
            {project.tools.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const visible =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="section section-dark" id="projects">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-intro">
            These selected projects reflect my passion for blending strategy with
            creativity, solving real problems through thoughtful design and
            impactful storytelling.
          </p>
        </motion.div>

        <div className="filters" role="group" aria-label="Filter projects">
          {projectCategories.map((c) => (
            <button
              key={c}
              className={`filter-btn${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div className="projects-bento" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.button
                key={p.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(p)}
                aria-label={`Open ${p.title} project details`}
              >
                <img src={p.image} alt={p.title} loading="lazy" />
                <span className="project-overlay">
                  <span className="project-category">{p.category}</span>
                  <span className="project-title">{p.title}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="projects-cta">
          <a href="#contact" className="btn btn-ghost">
            Browse All Projects
          </a>
        </div>
      </div>

      <AnimatePresence>
        {active && <Lightbox project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
