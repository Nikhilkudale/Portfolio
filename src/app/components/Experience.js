'use client';

import React from 'react';
import styles from './Experience.module.css';

export default function Experience() {
  const experiences = [
    {
      date: 'Jan 2024 - Present',
      role: 'Full Stack Engineer',
      company: 'Freelance & Open Source',
      points: [
        'Architected and implemented modular backends using Spring Boot, securing end-points with JWT tokens and Spring Security.',
        'Developed interactive, responsive dashboards with React and Next.js, utilizing state management for fluid client interactions.',
        'Designed database schemas using PostgreSQL, writing optimized queries and managing transaction scopes.',
        'Configured CI/CD automation pipelines to build and deploy applications on cloud providers like Vercel.',
      ],
    },
    {
      date: 'Jul 2022 - Dec 2023',
      role: 'Associate Software Engineer',
      company: 'Tech Solutions Corp',
      points: [
        'Designed RESTful microservices for e-commerce platforms, utilizing Hibernate and JPA for relational data modeling.',
        'Collaborated with designers to translate high-fidelity designs into responsive frontend code using React.',
        'Wrote integration and unit tests with JUnit, Mockito, and Jest, maintaining a test coverage of over 85%.',
        'Participated in daily agile scrums and sprint reviews, ensuring timely delivery of product increments.',
      ],
    },
    {
      date: 'Jan 2022 - Jun 2022',
      role: 'Software Intern',
      company: 'Innovations Lab',
      points: [
        'Assisted senior developers in migrating legacy monolith functionalities into containerized Spring Boot applications.',
        'Implemented core database schema patches and query optimizations for relational databases.',
        'Configured Docker containers for development environments, standardizing the onboarding workflow.',
      ],
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <h2 className="sectionTitle">Professional Experience</h2>
        <p className="sectionSubtitle">
          My career roadmap, highlighting engineering achievements and roles in software development.
        </p>

        <div className={styles.timelineWrapper}>
          {/* Vertical track line indicator */}
          <div className={styles.timelineLine} />

          {experiences.map((exp, idx) => (
            <div key={idx} className={styles.timelineItem}>
              {/* Glowing timeline dot node */}
              <div className={styles.timelineDot} />
              
              <div className={styles.timelineContent}>
                <span className={styles.date}>{exp.date}</span>
                <h3 className={styles.role}>{exp.role}</h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <ul className={styles.bulletPoints}>
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
