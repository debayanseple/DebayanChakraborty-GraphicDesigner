import { motion } from 'framer-motion';
import { education } from '../data/experience';
import { tools, personalSkills } from '../data/skills';
import '../styles/education.css';
import psIcon from '../assets/icons/adobe-photoshop.png';
import aiIcon from '../assets/icons/adobe-illustrator.png';
import canvaIcon from '../assets/icons/canva.png';
import figmaIcon from '../assets/icons/figma.png';

const iconMap = {
  'adobe-photoshop.png': psIcon,
  'adobe-illustrator.png': aiIcon,
  'canva.png': canvaIcon,
  'figma.png': figmaIcon,
};

const R = 24;
const CIRC = 2 * Math.PI * R;

function ToolTile({ tool, index }) {
  const offset = CIRC * (1 - tool.level / 100);
  const brand = tool.brand || 'var(--blue)';
  return (
    <motion.div
      className="tool-tile"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      title={`${tool.name} — ${tool.level}%`}
    >
      <div className="tool-ring">
        <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
          <circle className="ring-bg" cx="27" cy="27" r={R} fill="none" strokeWidth="4" />
          <motion.circle
            className="ring-fg"
            cx="27"
            cy="27"
            r={R}
            fill="none"
            strokeWidth="4"
            strokeDasharray={CIRC}
            style={{ stroke: brand }}
            initial={{ strokeDashoffset: CIRC }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
          />
        </svg>
        {tool.iconSrc ? (
          <img
            className="tool-icon-img"
            src={iconMap[tool.iconSrc]}
            alt={`${tool.name} icon`}
            width={36}
            height={36}
          />
        ) : (
          <span className="tool-icon" style={{ background: brand, color: '#fff', borderRadius: '6px', width: '28px', height: '28px', fontSize: '0.7rem' }}>
            {tool.icon}
          </span>
        )}
      </div>
      <span className="tool-name">{tool.name}</span>
    </motion.div>
  );
}

export default function EducationSkills() {
  return (
    <section className="section section-dark" id="education">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">Background</p>
          <h2 className="section-title">Education, Skills &amp; Tools</h2>
        </motion.div>

        <div className="edu-skills-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="subhead">Education</p>
            <div className="edu-card">
              <span className="edu-period">{education.period}</span>
              <h3 className="edu-degree">{education.degree}</h3>
              <p className="edu-school">{education.school}</p>
            </div>
          </motion.div>

          <div>
            <p className="subhead">Tools &amp; Software</p>
            <div className="tools-grid">
              {tools.map((t, i) => (
                <ToolTile key={t.name} tool={t} index={i} />
              ))}
            </div>

            <p className="subhead">Personal Skills</p>
            <div className="skill-chips">
              {personalSkills.map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
