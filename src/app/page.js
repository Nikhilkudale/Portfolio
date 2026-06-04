import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Fixed Background Layer */}
      <ThreeBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Core Portfolio Page Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Styled Glassmorphism Footer */}
      <footer style={{
        background: 'rgba(13, 11, 35, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-display)',
      }}>
        <div className="container">
          <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>
            &copy; {currentYear} Nikhil Kudale. Built with Next.js &amp; CSS Modules.
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Designed for free deployment on Vercel.
          </p>
        </div>
      </footer>
    </>
  );
}
