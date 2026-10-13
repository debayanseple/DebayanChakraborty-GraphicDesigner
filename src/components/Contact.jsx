import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPhone, FiMail, FiCheck, FiArrowRight } from 'react-icons/fi';
import { FaTwitter, FaInstagram, FaBehance, FaDribbble } from 'react-icons/fa';
import { profile } from '../data/profile';
import '../styles/contact.css';

const SERVICES = ['Branding', 'Web Design', 'UI/UX', 'Graphic Design'];

const initial = { name: '', email: '', service: '', message: '' };

function validate(values) {
  const e = {};
  if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Please enter a valid email.';
  if (!values.service) e.service = 'Please select a service.';
  if (!values.message.trim() || values.message.trim().length < 10) e.message = 'Please write a few words (at least 10 characters).';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate(values);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setStatus('sending');
    // Front-end only — simulate async submit
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus('idle');
  };

  return (
    <section className="section section-dark" id="contact">
      <div className="container contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-kicker">Contact</p>
          <h2 className="contact-cta-title">Let&apos;s work together</h2>
          <p className="contact-cta-text">
            Let&apos;s build something impactful together, whether it&apos;s your brand, your website, or your next
            big idea.
          </p>

          <div className="contact-pills">
            <a className="contact-pill" href={phoneHref}>
              <FiPhone aria-hidden="true" /> {profile.phone}
            </a>
            <a className="contact-pill" href={`mailto:${profile.email}`}>
              <FiMail aria-hidden="true" /> {profile.email}
            </a>
          </div>

          <div className="socials-row" aria-label="Social links">
            <a
              className="social-link"
              href={profile.socials.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
            >
              <FaTwitter />
            </a>
            <a
              className="social-link"
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              className="social-link"
              href={profile.socials.behance}
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
            >
              <FaBehance />
            </a>
            <a
              className="social-link"
              href={profile.socials.dribbble}
              target="_blank"
              rel="noreferrer"
              aria-label="Dribbble"
            >
              <FaDribbble />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                className="contact-form form-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                role="status"
                aria-live="polite"
              >
                <div className="form-success-icon" aria-hidden="true">
                  <FiCheck />
                </div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I&apos;ll get back to you shortly.</p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ marginTop: '1.4rem' }}
                  onClick={reset}
                >
                  Send another message
                </button>
                <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Front-end only — wire this form to Formspree, EmailJS, or your backend.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="c-name">Name</label>
                    <input
                      id="c-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={values.name}
                      onChange={onChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && (
                      <span id="err-name" className="field-error">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={onChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <span id="err-email" className="field-error">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="c-service">Service Needed</label>
                  <select
                    id="c-service"
                    name="service"
                    value={values.service}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? 'err-service' : undefined}
                    className={errors.service ? 'error' : ''}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <span id="err-service" className="field-error">
                      {errors.service}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    placeholder="What can I help you with?"
                    value={values.message}
                    onChange={onChange}
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'err-message' : undefined}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && (
                    <span id="err-message" className="field-error">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Submit'} <FiArrowRight aria-hidden="true" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
