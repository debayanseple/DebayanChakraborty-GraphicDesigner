import { FiArrowUp } from 'react-icons/fi';
import { profile } from '../data/profile';
import Marquee from './Marquee';
import '../styles/footer.css';

const STRIP = ['Available for work', 'UI/UX', 'Branding', 'Web Design', 'Graphic Design', 'Digital Design'];

export default function Footer() {
  const scrollTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="footer-marquee-wrap" aria-hidden="true">
        <Marquee
          items={STRIP}
          duration={22}
          renderItem={(text) => (
            <span className="footer-marquee-text">
              {text} <span className="star">✦</span>
            </span>
          )}
        />
      </div>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-copy">{profile.copyright}</p>
          <span className="footer-brand" aria-hidden="true">
            {profile.firstName} ✦ {profile.title}
          </span>
          <button type="button" className="to-top" onClick={scrollTop} aria-label="Back to top">
            <FiArrowUp />
          </button>
        </div>
      </footer>
    </>
  );
}
