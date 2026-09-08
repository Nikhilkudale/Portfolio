'use client';

import React from 'react';
import styles from './Experience.module.css';
import TiltCard from './TiltCard';

export default function Experience() {
  const experiences = [
    {
      date: 'Jun 2024 - Present',
      role: 'Project Engineer / Software Developer - Philips',
      company: 'Wipro (Full-time)',
      points: [
        'Automated Software Development Life Cycle (SDLC) workflow systems using Power Automate and custom scripting, resulting in a 30% increase in process efficiency.',
        'Developed backend features and scripts using Python and Java to improve utility processing and integration.',
        'Collaborated on system integrations and release procedures for healthcare-related Philips modules, ensuring compliance and robust error handling.',
      ],
    },
    {
      date: 'Jan 2023 - Sep 2023',
      role: 'Full Stack Developer',
      company: 'KodNest (Internship)',
      points: [
        'Built responsive, high-performance web components using HTML5, Cascading Style Sheets (CSS), and JavaScript.',
        'Integrated database connections using Java Database Connectivity (JDBC) for relational database communication.',
        'Participated in collaborative team sprints to debug layout rendering and database connectivity challenges.',
      ],
    },
    {
      date: 'Sep 2021',
      role: 'Data Science Intern',
      company: 'Mitras IT Solutions',
      points: [
        'Analyzed data trends and created operational reports using Tableau and visualization tools.',
        'Explored foundational Artificial Intelligence (AI) algorithms and predictive structures for data patterns.',
      ],
    },
  ];

  const education = [
    {
      date: 'Graduated',
      degree: 'Bachelor of Engineering (B.E.) in Computer Science and Engineering',
      institution: 'Jain (Deemed-to-be University)',
      details: 'Focused on Java, Data Visualization, Relational Databases, and Core Software Architecture.',
    },
  ];

  const certifications = [
    {
      date: 'Issued May 2026',
      title: 'Building RAG Applications using LangChain, FAISS & Open-Source LLMs',
      issuer: 'LinkedIn',
      skills: 'Large Language Models (LLM), Generative AI, Retrieval-Augmented Generation (RAG)',
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <h2 className="sectionTitle">Experience &amp; Education</h2>
        <p className="sectionSubtitle">
          My professional timeline, academic background, and technical certifications.
        </p>

        <div className={styles.timelineWrapper}>
          {/* Vertical timeline track line */}
          <div className={styles.timelineLine} />

          {/* Experience Timeline Items */}
          {experiences.map((exp, idx) => (
            <div key={`exp-${idx}`} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <TiltCard className={styles.timelineContent}>
                <span className={styles.date}>{exp.date}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <ul className={styles.bulletPoints}>
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </TiltCard>
            </div>
          ))}

          {/* Education Timeline Items */}
          {education.map((edu, idx) => (
            <div key={`edu-${idx}`} className={styles.timelineItem}>
              <div className={styles.timelineDot} style={{ borderColor: 'var(--secondary-color)' }} />
              <TiltCard className={styles.timelineContent}>
                <span className={styles.date} style={{ color: 'var(--secondary-color)', background: 'rgba(6, 182, 212, 0.1)' }}>{edu.date}</span>
                <h3 className={styles.role}>{edu.degree}</h3>
                <h4 className={styles.company}>{edu.institution}</h4>
                <ul className={styles.bulletPoints}>
                  <li>{edu.details}</li>
                </ul>
              </TiltCard>
            </div>
          ))}

          {/* Certifications Timeline Items */}
          {certifications.map((cert, idx) => (
            <div key={`cert-${idx}`} className={styles.timelineItem}>
              <div className={styles.timelineDot} style={{ borderColor: 'var(--accent-color)' }} />
              <TiltCard className={styles.timelineContent}>
                <span className={styles.date} style={{ color: 'var(--accent-color)', background: 'rgba(236, 72, 153, 0.1)' }}>{cert.date}</span>
                <h3 className={styles.role}>{cert.title}</h3>
                <h4 className={styles.company}>{cert.issuer}</h4>
                <ul className={styles.bulletPoints}>
                  <li><strong>Core Skills:</strong> {cert.skills}</li>
                </ul>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
