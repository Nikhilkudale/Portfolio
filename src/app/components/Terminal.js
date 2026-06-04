'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus terminal input when clicking the terminal container
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const command = trimmedCmd.toLowerCase();
    let response = '';
    let isError = false;

    switch (command) {
      case 'help':
        response = `Available commands:
  about      - Brief biography of Nikhil
  skills     - Categorized technical stack
  projects   - Showcases live application links
  experience - Career history and timeline
  clear      - Empty console screen`;
        break;
      case 'about':
        response = `Nikhil Kudale | Full Stack & AI Engineer
--------------------------------------
A Software Developer based in Bengaluru, specializing in building robust, high-performance backend modules (Java, Spring Boot), automating software development workflows (Python, Power Automate), and creating conversational AI workflows (RAG pipelines with LangChain & FAISS).`;
        break;
      case 'skills':
        response = `TECHNICAL TOOLKIT:
------------------
[Backend & AI]
  - Java, Python, Spring Boot, Spring Security, REST APIs
  - LangChain, FAISS Vector DB, Generative AI models
[Frontend & Scripts]
  - React.js, Next.js, HTML5, CSS Modules, JavaScript (ES6+)
  - Power Automate workflow scripts
[Databases & Tools]
  - PostgreSQL, MySQL, JDBC, Git/GitHub, Streamlit, Docker`;
        break;
      case 'projects':
        response = `LIVE PROJECT PORTFOLIO:
-----------------------
1. 🛒 Cartly (Full Stack E-Commerce)
   - Tech: Spring Boot, React, Cloudflare Pages, PostgreSQL
   - Live: https://cartly-cgt.pages.dev/
2. 🤖 RAG Chatbot (Conversational AI)
   - Tech: Python, LangChain, FAISS Vector DB, Streamlit
   - Live: https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/
3. ⚡ AlgoPath (Algorithm Simulation)
   - Tech: HTML5 Canvas API, Next.js, CSS Modules`;
        break;
      case 'experience':
        response = `CAREER MAP:
-----------
* Project Engineer / Software Developer
  Wipro (Philips project) | Jun 2024 - Present
  - Automated SDLC workflow systems, increasing process efficiency by 30%.
* Full Stack Developer Intern
  KodNest | Jan 2023 - Sep 2023
  - Developed responsive components and integrated relational databases using JDBC.
* Data Science Intern
  Mitras IT Solutions | Sep 2021
  - Created visualization sheets using Tableau and studied AI structures.`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not found: "${trimmedCmd}". Type "help" for a list of valid commands.`;
        isError = true;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: trimmedCmd },
      { type: 'output', text: response, isError },
    ]);
    setInput('');
  };

  return (
    <div className={styles.terminalContainer} onClick={handleTerminalClick}>
      {/* Mock Terminal Top Header bar */}
      <div className={styles.terminalHeader}>
        <div className={styles.windowDots}>
          <span className={`${styles.windowDot} ${styles.dotRed}`}></span>
          <span className={`${styles.windowDot} ${styles.dotYellow}`}></span>
          <span className={`${styles.windowDot} ${styles.dotGreen}`}></span>
        </div>
        <span className={styles.terminalTitle}>developer@nikhil-desktop:~</span>
        <div style={{ width: '42px' }}></div> {/* spacer */}
      </div>

      {/* Terminal log logs stream */}
      <div className={styles.terminalBody} ref={terminalBodyRef}>
        <div className={styles.welcomeText}>
          Welcome to Nikhil Kudale's Retro Shell Terminal [v1.0.0]
          <br />
          Type 'help' and press Enter to see list of commands.
          <br />
          -------------------------------------------------------
        </div>

        {history.map((log, idx) => (
          <div key={idx}>
            {log.type === 'command' ? (
              <div className={styles.commandRow}>
                <span className={styles.promptSymbol}>$</span>
                <span className={styles.inputText}>{log.text}</span>
              </div>
            ) : (
              <div className={`${styles.outputText} ${log.isError ? styles.errorText : ''}`}>
                {log.text}
              </div>
            )}
          </div>
        ))}

        {/* Live typing row prompt */}
        <div className={styles.inputRow}>
          <span className={styles.promptSymbol}>$</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.terminalInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeCommand(input);
              }
            }}
            placeholder="type here..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
