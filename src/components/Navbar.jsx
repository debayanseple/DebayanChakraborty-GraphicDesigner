import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data/profile';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar-inner" aria-label="Primary">
        <a href="#home" className="nav-brand">
          <img
            className="nav-avatar"
            src={profile.avatar}
            alt={`${profile.name} avatar`}
            width={38}
            height={38}
          />
          <span>{profile.firstName}</span>
        </a>

        <div className={`nav-links${open ? ' open' : ''}`}>
          {profile.navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <span className={`nav-badge${open ? ' menu-open-badge' : ''}`}>
            <span className="nav-badge-dot" />
            {profile.availability}
          </span>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>
    </header>
  );
}
