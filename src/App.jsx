import { MotionConfig } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import EducationSkills from './components/EducationSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <EducationSkills />
        <Experience />
        <Projects />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
