import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '../data/faq';
import '../styles/faq.css';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section-dark" id="faq">
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
            FAQ
          </p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-intro" style={{ marginInline: 'auto' }}>
            Here are answers to some of the most common questions I receive as a
            freelance designer. If you don't see your question here, feel free to
            reach out. I'm happy to help!
          </p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                className={`faq-item${isOpen ? ' open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  {faq.question}
                  <span className="faq-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      id={`faq-answer-${i}`}
                      role="region"
                    >
                      <p className="faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
