'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

// Levenshtein distance for terminal auto-correction
const levenshteinDistance = (a, b) => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      const val = b[i - 1] === a[j - 1] ? row[j - 1] : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
};

// Aliases dictionary mapping user shortcuts and common misspellings
const commandAliases = {
  about: ['about', 'abt', 'bio', 'nikhil', 'who', 'info', 'resume', 'cv', 'background'],
  skills: ['skills', 'skil', 'skils', 'skill', 'stack', 'tech', 'toolkit', 'languages', 'frameworks', 'java', 'python', 'react'],
  projects: ['projects', 'proj', 'project', 'projets', 'prjt', 'interview', 'ats', 'cartly', 'rag', 'apps', 'work', 'portfolio'],
  experience: ['experience', 'exp', 'expe', 'expereicne', 'experiance', 'work', 'wipro', 'job', 'career', 'history', 'philips'],
  contact: ['contact', 'cntct', 'contct', 'email', 'emial', 'mail', 'phone', 'hire', 'reach', 'linkedin'],
  help: ['help', 'hlp', 'hlep', 'halp', 'commands', 'cmd', 'options', '?', '-h', '--help'],
  clear: ['clear', 'cls', 'clr', 'clean'],
};

const resolveCommand = (userCmd) => {
  const inputCmd = userCmd.toLowerCase().trim();

  // Direct match or alias match
  for (const [canonicalCmd, aliases] of Object.entries(commandAliases)) {
    if (aliases.includes(inputCmd)) {
      return { canonicalCmd, corrected: false };
    }
  }

  // Fuzzy match against canonical commands & aliases
  let bestMatch = null;
  let minDistance = Infinity;

  for (const [canonicalCmd, aliases] of Object.entries(commandAliases)) {
    for (const alias of aliases) {
      if (alias.length >= 3 && inputCmd.length >= 3) {
        const dist = levenshteinDistance(inputCmd, alias);
        if (dist < minDistance) {
          minDistance = dist;
          bestMatch = canonicalCmd;
        }
      }
    }
  }

  // Auto-correct if distance <= 2
  if (bestMatch && minDistance <= 2) {
    return { canonicalCmd: bestMatch, corrected: true, autoCorrectedFrom: inputCmd };
  }

  // Suggestion if distance is 3
  if (bestMatch && minDistance === 3) {
    return { canonicalCmd: null, suggestion: bestMatch };
  }

  return { canonicalCmd: null };
};

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

    const { canonicalCmd, corrected, autoCorrectedFrom, suggestion } = resolveCommand(trimmedCmd);
    let response = '';
    let isError = false;

    let prefixNotice = corrected ? `ℹ️ (Auto-corrected "${autoCorrectedFrom}" → "${canonicalCmd}")\n` : '';

    switch (canonicalCmd) {
      case 'help':
        response = `${prefixNotice}Available commands:
  about      - Brief biography of Nikhil
  skills     - Categorized technical stack
  projects   - Showcases live application links
  experience - Career history and timeline
  contact    - Email & professional profiles
  clear      - Empty console screen`;
        break;

      case 'about':
        response = `${prefixNotice}Nikhil Kudale | Full Stack & AI Engineer
--------------------------------------
A Software Developer based in Bengaluru, specializing in building robust, high-performance backend modules (Java, Spring Boot), automating software development workflows (Python, Power Automate), and creating conversational AI workflows (RAG pipelines with LangChain & FAISS).`;
        break;

      case 'skills':
        response = `${prefixNotice}TECHNICAL TOOLKIT:
------------------
[Backend & AI]
  - Java, Python, Spring Boot, Spring Security, REST APIs
  - LangChain, FAISS Vector DB, Generative AI models
[Frontend & Scripts]
  - React.js, Next.js, HTML5, CSS Modules, JavaScript (ES6+)
  - Power Automate workflow scripts
[Databases & Tools]
  - PostgreSQL, MySQL, JDBC, Git, Streamlit, Docker`;
        break;

      case 'projects':
        response = `${prefixNotice}LIVE PROJECT PORTFOLIO:
-----------------------
1. 🎙️ AI Interview Assistant (Generative AI SaaS)
   - Tech: Python, Gemini API, LangChain, FAISS, Streamlit
   - Live: https://aiinterviewassistant-kbxoenhbgtew5wyghwvqln.streamlit.app/
2. 🛒 Cartly (Full Stack E-Commerce)
   - Tech: Spring Boot, React, MySQL, Docker, Render
   - Live: https://cartly-cgt.pages.dev/
3. 🤖 RAG Chatbot (Conversational AI)
   - Tech: Python, LangChain, FAISS Vector DB, Streamlit
   - Live: https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/`;
        break;

      case 'experience':
        response = `${prefixNotice}CAREER MAP:
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

      case 'contact':
        response = `${prefixNotice}CONTACT DETAILS:
----------------
- Email: nikhilkudale76@gmail.com
- LinkedIn: https://linkedin.com/in/nikhil-kudale-dev/
- Location: Bengaluru, Karnataka, India`;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        if (suggestion) {
          response = `Command not found: "${trimmedCmd}". Did you mean "${suggestion}"? Type "help" for a list of valid commands.`;
        } else {
          response = `Command not found: "${trimmedCmd}". Type "help" for a list of valid commands.`;
        }
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
