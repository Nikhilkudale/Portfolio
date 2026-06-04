'use client';

import React from 'react';
import styles from './About.module.css';

export default function About() {
  const skillsList = [
    'Java',
    'Python',
    'Spring Boot',
    'LangChain',
    'FAISS Vector DB',
    'React & Next.js',
    'Power Automate',
    'PostgreSQL / SQL',
    'Generative AI / LLMs',
  ];

  return (
    <section id="about">
      <div className="container">
        <h2 className="sectionTitle">About Me</h2>
        <p className="sectionSubtitle">
          A brief introduction to my background, philosophy, and expertise.
        </p>

        <div className={styles.aboutGrid}>
          {/* Bio text block */}
          <div className={styles.bioSection}>
            <h3>Designing scalable solutions.</h3>
            <p className={styles.bioText}>
              I am a software engineer with a strong foundation in backend development using Java and Spring Boot, paired with hands-on experience building conversational AI tools (RAG pipelines with LangChain &amp; FAISS) and full-stack web applications.
            </p>
            <p className={styles.bioText}>
              Additionally, I work with workflow scripting and automation (using Python and Power Automate) to simplify development pipelines and enhance organizational process efficiencies.
            </p>

            {/* Metrics counter grid */}
            <div className={styles.highlights}>
              <div className={styles.highlightCard}>
                <span className={styles.number}>2+</span>
                <span className={styles.label}>Years Exp</span>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.number}>15+</span>
                <span className={styles.label}>Projects</span>
              </div>
              <div className={styles.highlightCard}>
                <span className={styles.number}>10+</span>
                <span className={styles.label}>Tech Stacks</span>
              </div>
            </div>
          </div>

          {/* Visual highlight avatar card */}
          <div className={styles.visualWrapper}>
            <div className={styles.cardContainer}>
              <div className={`${styles.mainCard} glassCard`}>
                <div className={styles.avatarRing}>
                  <div className={styles.avatar}>NK</div>
                </div>
                <h4 className={styles.cardTitle}>Nikhil Kudale</h4>
                <span className={styles.cardSubtitle}>Full Stack &amp; AI Engineer</span>
                <div className={styles.techStackRow}>
                  {skillsList.map((skill, index) => (
                    <span key={index} className={styles.techBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
