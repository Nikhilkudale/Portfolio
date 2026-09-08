'use client';

import React from 'react';
import styles from './Projects.module.css';
import TiltCard from './TiltCard';

export default function Projects() {
  const projectsList = [
    {
      title: 'Cartly',
      tag: 'Full Stack',
      icon: '🛒',
      description: 'A responsive e-commerce platform offering secure checkout, product listings, order processing, and dynamic inventory management. Built with a Java Spring Boot backend, React UI, MySQL database, and containerized with Docker for deployment on Render.',
      tech: ['Java', 'Spring Boot', 'React', 'Spring Security', 'MySQL', 'Docker', 'Render'],
      live: 'https://cartly-cgt.pages.dev/',
    },
    {
      title: 'RAG Chatbot',
      tag: 'Generative AI / LLM',
      icon: '🤖',
      description: 'A Retrieval-Augmented Generation (RAG) conversational chatbot utilizing LangChain workflows and FAISS vector indices to ingest documents and respond contextually. Hosted live via Streamlit.',
      tech: ['Python', 'LangChain', 'FAISS Vector DB', 'Open-Source LLMs', 'Streamlit'],
      live: 'https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/',
    },
    {
      title: 'AI Interview Assistant',
      tag: 'Generative AI SaaS',
      icon: '🎙️',
      description: 'A Full-Stack Generative AI SaaS app automating resume screening, ATS matching, and real-time STAR framework mock interviews powered by RAG (LangChain + FAISS), Google Gemini API, and HuggingFace embeddings.',
      tech: ['Python', 'Google Gemini API', 'LangChain', 'FAISS Vector DB', 'HuggingFace', 'Streamlit'],
      live: 'https://aiinterviewassistant-kbxoenhbgtew5wyghwvqln.streamlit.app/',
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="sectionTitle">My Projects</h2>
        <p className="sectionSubtitle">
          A showcase of recent engineering projects, including live deployments of e-commerce websites and AI chatbots.
        </p>

        <div className={styles.projectsGrid}>
          {projectsList.map((project, index) => (
            <TiltCard key={index} className={styles.projectCard}>
              {/* Card visual header */}
              <div className={styles.projectHeader}>
                <span className={styles.featuredBadge}>{project.tag}</span>
                <span className={styles.projectIcon}>{project.icon}</span>
              </div>

              {/* Card details body */}
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                {/* Tech tags */}
                <div className={styles.techTags}>
                  {project.tech.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Call actions */}
                <div className={styles.projectFooter}>
                  <a href={project.live} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24">
                      <path d="M14 0l3.75 3.75-9.75 9.75 2.5 2.5 9.75-9.75 3.75 3.75v-10h-10zm-14 4v16h16v-8h-2v6h-12v-12h6v-2h-8z" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
