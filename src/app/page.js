import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Fixed 3D Perspective Background */}
      <ThreeBackground />

      {/* Navigation Headers */}
      <Navbar />

      {/* Floating glassmorphic social icons panel (Left side) */}
      <div className="socialSidebar">
        <a
          href="https://linkedin.com/in/nikhil-kudale-dev/"
          className="socialIcon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="mailto:nikhilnkudale@gmail.com" className="socialIcon" aria-label="Email">
          <svg viewBox="0 0 24 24">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 3.92v-8.736l4.623 4.816zm1.321 1.071l4.056 4.22c.162.169.379.253.597.253s.435-.084.597-.253l4.059-4.22 5.097 5.327h-19.502l5.096-5.327zm1.321-1.071l4.735-4.932 4.738 4.932-4.738 4.929-4.735-4.929zm10.112 1.071l4.623-4.816v8.736l-4.623-3.92z" />
          </svg>
        </a>
      </div>

      {/* Floating AI Resume Chatbot (Bottom right) */}
      <Chatbot />

      {/* Main Sections flow */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer copyright section */}
      <footer
        style={{
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
        }}
      >
        <div className="container">
          <p style={{ fontWeight: 500, fontSize: '0.95rem' }}>
            &copy; {currentYear} Nikhil Kudale. All rights reserved.
          </p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Built with Next.js, React &amp; Modern Web Engineering.
          </p>
        </div>
      </footer>
    </>
  );
}
