'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I am Nikhil's AI Assistant. Ask me anything about his work experience, projects, skills, or how to contact him!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll messages list on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const suggestions = [
    { label: '🎙️ AI Interview Assistant', query: 'Tell me about the AI Interview Assistant SaaS' },
    { label: '🛒 Cartly E-commerce', query: 'Tell me about Cartly' },
    { label: '🤖 RAG Chatbot project', query: 'What is his RAG Chatbot application?' },
    { label: '⚙️ Work at Wipro', query: 'What does he do at Wipro?' },
  ];

  // Levenshtein distance algorithm for fuzzy typo matching
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

  // Upgraded AI query engine with fuzzy distance & typo tolerance
  const getBotResponse = (query) => {
    const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
    const words = cleanQuery.split(/\s+/).filter(Boolean);

    if (words.length === 0) {
      return "💬 Please type a question or click one of the suggested prompts below!";
    }

    const intents = [
      {
        id: 'greeting',
        keywords: ['hi', 'hello', 'hey', 'hola', 'sup', 'yo', 'greetings', 'namaste'],
        response: "Hello! 👋 I'm Nikhil's AI Assistant. How can I help you today? Ask me about his work at Wipro, projects (AI Interview Assistant, Cartly & RAG Chatbot), core skills, education, or contact info!",
      },
      {
        id: 'about',
        keywords: ['nikhil', 'who', 'about', 'summary', 'overview', 'bio', 'intro', 'cv', 'resume', 'background', 'profile'],
        response: "👨‍💻 **Nikhil Kudale** is a Full-Stack & Generative AI Engineer based in Bengaluru, India. He works as a Software Developer at **Wipro** (assigned to Philips modules). He specializes in **Java Spring Boot**, **Python**, **React/Next.js**, and building **Generative AI / RAG workflows** using LangChain, FAISS, and Google Gemini.",
      },
      {
        id: 'interview_assistant',
        keywords: ['interview', 'assistant', 'ats', 'screening', 'mock', 'star', 'gemini', 'huggingface', 'minilm', 'saas'],
        response: "🎙️ **AI Interview Assistant** is Nikhil's Full-Stack Generative AI SaaS app. It automates resume screening, ATS matching, and real-time STAR-framework mock interviews using **Google Gemini API**, **LangChain**, **FAISS vector store**, and HuggingFace embeddings (`all-MiniLM-L6-v2`).\n\n🔗 Live App: [https://aiinterviewassistant-kbxoenhbgtew5wyghwvqln.streamlit.app/](https://aiinterviewassistant-kbxoenhbgtew5wyghwvqln.streamlit.app/)",
      },
      {
        id: 'wipro',
        keywords: ['wipro', 'wipr', 'wipor', 'whpro', 'philips', 'work', 'job', 'experience', 'exp', 'company', 'role', 'designation', 'sdlc', 'automate'],
        response: "💼 Nikhil is a **Project Engineer / Software Developer** at **Wipro** (assigned to Philips modules) in Bengaluru (since June 2024). He automated SDLC workflow systems using Power Automate and Python scripting, increasing process efficiency by **30%**.",
      },
      {
        id: 'cartly',
        keywords: ['cartly', 'cartely', 'carltly', 'catly', 'carty', 'ecommerce', 'ecom', 'shop', 'shopping', 'store', 'checkout', 'docker', 'render', 'mysql'],
        response: "🛒 **Cartly** is Nikhil's featured Full-Stack E-commerce platform. The backend is built with **Java & Spring Boot** (JWT + MySQL), containerized with **Docker**, and deployed on **Render**, paired with a responsive **React** UI.\n\n🔗 Live Demo: [https://cartly-cgt.pages.dev/](https://cartly-cgt.pages.dev/)",
      },
      {
        id: 'rag',
        keywords: ['rag', 'chatbot', 'chat', 'bot', 'langchain', 'faiss', 'vector', 'ai', 'llm', 'streamlit', 'gpt', 'genai', 'python'],
        response: "🤖 Nikhil built an interactive **RAG Chatbot Application** using Python, LangChain, FAISS vector databases, and open-source LLMs. It enables contextual document Q&A.\n\n🔗 Live Streamlit App: [https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/](https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/)",
      },
      {
        id: 'projects',
        keywords: ['projects', 'project', 'projct', 'prjt', 'apps', 'portfolio', 'built', 'work'],
        response: "🚀 **Nikhil's Featured Projects:**\n\n1. 🎙️ **AI Interview Assistant**: Full-Stack GenAI SaaS for ATS screening & STAR mock interviews (Gemini API + RAG + FAISS + Streamlit). [View App](https://aiinterviewassistant-kbxoenhbgtew5wyghwvqln.streamlit.app/)\n2. 🛒 **Cartly**: Full-Stack E-commerce Platform (Java Spring Boot + React + MySQL + Docker + Render). [View Cartly](https://cartly-cgt.pages.dev/)\n3. 🤖 **RAG Chatbot**: Document AI QA Assistant (Python + LangChain + FAISS + Streamlit). [View RAG Bot](https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/)",
      },
      {
        id: 'skills',
        keywords: ['skills', 'skils', 'skill', 'tech', 'stack', 'technologies', 'languages', 'frameworks', 'tools', 'java', 'spring', 'boot', 'react', 'next', 'sql', 'mysql', 'docker', 'render', 'power', 'automate'],
        response: "🛠️ **Nikhil's Core Tech Stack:**\n\n• **Languages:** Java, Python, SQL, JavaScript\n• **Frameworks:** Spring Boot, Spring Security, React, Next.js\n• **AI Tools:** LangChain, FAISS, OpenAI/Google Gemini LLMs\n• **Automation:** Power Automate, Python scripting\n• **Databases & DevOps:** MySQL, PostgreSQL, Docker, Render, Git, Streamlit",
      },
      {
        id: 'contact',
        keywords: ['contact', 'contct', 'cntct', 'contect', 'email', 'emial', 'mail', 'phone', 'mobile', 'call', 'number', 'linkedin', 'hire', 'reach', 'connect', 'message', 'address'],
        response: "✉️ You can connect with Nikhil directly through the contact form on this site, or reach out via:\n\n• **Email:** nikhilnkudale@gmail.com\n• **LinkedIn:** [linkedin.com/in/nikhil-kudale-dev/](https://linkedin.com/in/nikhil-kudale-dev/)",
      },
      {
        id: 'education',
        keywords: ['education', 'edu', 'eduation', 'college', 'clg', 'colg', 'university', 'universty', 'jain', 'degree', 'b.e', 'be', 'btech', 'cs', 'computer', 'science', 'gpa', 'cgpa', 'marks'],
        response: "🎓 Nikhil graduated with a **Bachelor of Engineering (B.E.) in Computer Science and Engineering** from **Jain (Deemed-to-be University)** in Bengaluru, with a strong foundation in Core Java and Data Structures.",
      },
      {
        id: 'internship',
        keywords: ['internship', 'intern', 'intrn', 'kodnest', 'kodnst', 'mitras', 'tableau', 'jdbc', 'data science'],
        response: "🎓 **Nikhil's Internships:**\n\n1. **Full Stack Developer Intern @ KodNest** (Jan 2023 – Sep 2023): Focused on Web development (HTML/CSS/JS) and relational database integration using **JDBC**.\n2. **Data Science Intern @ Mitras IT Solutions** (Sep 2021): Built exploratory data visualizations with Tableau.",
      },
      {
        id: 'location',
        keywords: ['location', 'loc', 'city', 'where', 'bengaluru', 'bangalore', 'karnataka', 'india', 'place', 'based', 'live'],
        response: "📍 Nikhil is currently based in **Bengaluru (Bangalore), Karnataka, India**.",
      },
    ];

    let bestIntent = null;
    let maxScore = 0;

    for (const intent of intents) {
      let score = 0;

      for (const kw of intent.keywords) {
        // Direct inclusion check
        if (cleanQuery.includes(kw)) {
          score += kw.length > 3 ? 10 : 5;
        }

        // Word-level exact & fuzzy match
        for (const word of words) {
          if (word === kw) {
            score += 15;
          } else if (word.length >= 4 && kw.length >= 4) {
            const dist = levenshteinDistance(word, kw);
            const maxAllowedDist = kw.length > 5 ? 2 : 1;
            if (dist <= maxAllowedDist) {
              score += 10 - dist * 2;
            }
          }
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestIntent = intent;
      }
    }

    if (bestIntent && maxScore >= 4) {
      return bestIntent.response;
    }

    return "💬 I'm not sure I understand that question. You can ask me about:\n\n• **Experience:** Wipro role & Philips modules\n• **Projects:** Cartly (E-commerce) or RAG Chatbot\n• **Skills:** Tech stack & languages\n• **Contact:** Email & LinkedIn\n\nOr click one of the quick prompt chips below!";
  };

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text: textToSend },
    ]);
    setInput('');

    // Trigger typing indicator
    setIsTyping(true);

    // Simulate bot thinking delay
    setTimeout(() => {
      setIsTyping(false);
      const responseText = getBotResponse(textToSend);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: responseText },
      ]);
    }, 1000);
  };

  // Render markdown links inside message bubbles nicely
  const formatText = (text) => {
    const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      // Add plain text before link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add formatted link anchor
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--secondary-color)', textDecoration: 'underline', fontWeight: 600 }}
        >
          {match[1]}
        </a>
      );
      lastIndex = urlRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    // Split paragraphs and line breaks
    return parts.length > 0 ? parts : text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.chatbotWrapper}>
      {/* Floating Toggle Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.chatTrigger} ${isOpen ? styles.chatTriggerActive : ''}`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat window panel container */}
      <div className={`${styles.chatWindow} ${isOpen ? styles.chatWindowOpen : ''}`}>
        <div className={styles.chatHeader}>
          <div className={styles.botAvatar}>🤖</div>
          <div>
            <h4 className={styles.botTitle}>Nikhil's AI Assistant</h4>
            <span className={styles.botSubtitle}>Online • Ask anything</span>
          </div>
        </div>

        {/* Message stream */}
        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageBubble} ${
                msg.sender === 'user' ? styles.userMessage : styles.botMessage
              }`}
            >
              {formatText(msg.text)}
            </div>
          ))}

          {/* Simulated Typing Indicator */}
          {isTyping && (
            <div className={`${styles.messageBubble} ${styles.botMessage}`}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic suggestion chips */}
        <div className={styles.suggestionsList}>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              className={styles.suggestionBtn}
              onClick={() => handleSend(sug.query)}
            >
              {sug.label}
            </button>
          ))}
        </div>

        {/* Bottom input area */}
        <form
          className={styles.inputForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input
            type="text"
            className={styles.chatInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={isTyping}
          />
          <button type="submit" className={styles.sendBtn} disabled={isTyping}>
            ➔
          </button>
        </form>
      </div>
    </div>
  );
}
