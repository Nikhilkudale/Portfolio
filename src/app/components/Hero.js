'use client';

import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Full Stack & AI Engineer',
    'Generative AI (RAG) Specialist',
    'Spring Boot Developer',
    'React & Next.js Developer',
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing mode
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Pause at full word, then start backspacing
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting mode
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Complete delete, switch to next phrase
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -130;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background glow node meshes */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <div className={`${styles.heroContent} container`}>
        <span className={styles.greeting}>Welcome to my world</span>
        <h1 className={styles.title}>
          Hi, I'm <span className="primaryGradientText">Nikhil Kudale</span>
        </h1>
        <div className={styles.subtitle}>
          I build scalable AI &amp; Web apps as a{' '}
          <span className={styles.typewriterText}>{text}</span>
        </div>
        <p className={styles.description}>
          I'm a Full-Stack developer specializing in building scalable web applications. I integrate Generative AI capabilities (LLMs, LangChain, FAISS RAG workflows) with robust Java Spring Boot backends and interactive React/Next.js frontends.
        </p>

        <div className={styles.ctaGroup}>
          <button onClick={() => handleScrollTo('projects')} className="btn btnPrimary">
            View My Work
          </button>
          <button onClick={() => handleScrollTo('contact')} className="btn btnSecondary">
            Contact Me
          </button>
        </div>

        <a
          href="#about"
          className={styles.scrollIndicator}
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('about');
          }}
        >
          <span>Scroll Down</span>
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
        </a>
      </div>
    </section>
  );
}
