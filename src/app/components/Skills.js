'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './Skills.module.css';

export default function Skills() {
  const [animateBars, setAnimateBars] = useState(false);
  const sectionRef = useRef(null);

  const categories = [
    {
      title: 'Backend & AI Engineering',
      icon: '⚙️',
      colorClass: styles.cardIcon,
      barClass: '',
      skills: [
        { name: 'Java & Spring Boot', level: 90 },
        { name: 'Python Programming', level: 88 },
        { name: 'LangChain & RAG Pipelines', level: 85 },
        { name: 'FAISS Vector Databases', level: 82 },
        { name: 'Relational DBs (PostgreSQL/SQL)', level: 80 },
        { name: 'REST APIs / JDBC', level: 90 },
      ],
    },
    {
      title: 'Frontend & Automation',
      icon: '💻',
      colorClass: styles.cardIconCyan,
      barClass: styles.barCyan,
      skills: [
        { name: 'React.js & Next.js', level: 85 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'HTML5 & CSS Modules', level: 90 },
        { name: 'Power Automate Scripts', level: 88 },
        { name: 'Responsive UI Layouts', level: 92 },
        { name: 'Web Canvas & 3D Styling', level: 80 },
      ],
    },
    {
      title: 'Tools & Cloud Platforms',
      icon: '🛠️',
      colorClass: styles.cardIconPink,
      barClass: styles.barPink,
      skills: [
        { name: 'Git & GitHub Versioning', level: 88 },
        { name: 'Streamlit Cloud Hosting', level: 90 },
        { name: 'Cloudflare Pages / Vercel', level: 85 },
        { name: 'Maven & Gradle Builds', level: 82 },
        { name: 'Postman API Suite', level: 90 },
        { name: 'Docker / Basic Containers', level: 70 },
      ],
    },
  ];

  // Animate progress bars when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Card Tilt + Cursor Shine Position calculator
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates of cursor inside the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Card center coordinates
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angles (max ~10 degrees tilt)
    const rotateX = (yc - y) / 12;
    const rotateY = (x - xc) / 12;
    
    // Apply styles to card element
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    // Reset transformations with transition
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="skills" className={styles.skillsSection} ref={sectionRef}>
      <div className="container">
        <h2 className="sectionTitle">My Skills</h2>
        <p className="sectionSubtitle">
          A breakdown of my technical toolkit and proficiency across different development layers.
        </p>

        <div className={styles.skillsGrid}>
          {categories.map((cat, idx) => (
            <div key={idx} className={styles.tiltCardWrapper}>
              <div
                className={styles.skillCard}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.cardIcon} ${cat.colorClass}`}>{cat.icon}</div>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                </div>

                <div className={styles.skillsList}>
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className={styles.skillItem}>
                      <div className={styles.skillInfo}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillPercentage}>
                          {animateBars ? `${skill.level}%` : '0%'}
                        </span>
                      </div>
                      <div className={styles.progressTrack}>
                        <div
                          className={`${styles.progressBar} ${cat.barClass}`}
                          style={{ width: animateBars ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
