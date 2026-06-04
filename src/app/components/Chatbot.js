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
    { label: '🛒 Tell me about Cartly', query: 'Tell me about Cartly' },
    { label: '🤖 RAG Chatbot project', query: 'What is his RAG Chatbot application?' },
    { label: '⚙️ Work at Wipro', query: 'What does he do at Wipro?' },
    { label: '🛠️ Core Skills', query: 'What are his primary technical skills?' },
  ];

  // Client-side response mapping (RAG simulation using keyword matching)
  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('cartly') || q.includes('ecommerce') || q.includes('shop') || q.includes('e-commerce')) {
      return "🛒 **Cartly** is Nikhil's featured Full-Stack E-commerce platform. The backend is powered by **Java & Spring Boot** with Spring Security (JWT) and PostgreSQL, while the frontend is a highly responsive **React** UI. It's deployed live on Cloudflare Pages. You can test it here: [https://cartly-cgt.pages.dev/](https://cartly-cgt.pages.dev/)";
    }
    
    if (q.includes('chatbot') || q.includes('rag') || q.includes('langchain') || q.includes('faiss') || q.includes('ai') || q.includes('llm')) {
      return "🤖 Nikhil built an interactive **RAG Chatbot Application** using Python, LangChain, FAISS vector databases, and open-source LLMs. It is designed to query documents contextually. Check out the live application on Streamlit here: [https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/](https://nikhilkudale-ragchatbot-srcapp-givdds.streamlit.app/)";
    }

    if (q.includes('wipro') || q.includes('philips') || q.includes('work') || q.includes('experience') || q.includes('job')) {
      return "💼 Nikhil is currently a **Project Engineer / Software Developer** at **Wipro** (assigned to Philips modules) in Bengaluru, where he has been since June 2024. He automated SDLC workflow systems using Power Automate and custom scripting, increasing process efficiency by **30%**.";
    }

    if (q.includes('kodnest') || q.includes('internship') || q.includes('intern')) {
      return "🎓 From Jan 2023 to Sep 2023, Nikhil was a **Full Stack Developer Intern** at **KodNest** in Bengaluru. He focused on web development using HTML/CSS/JS and integrated relational database query connectors using **JDBC**.";
    }

    if (q.includes('mitras') || q.includes('data science')) {
      return "📊 In September 2021, Nikhil completed a **Data Science Internship** at **Mitras IT Solutions** in Hubli, utilizing Tableau for exploratory data visualizations and learning predictive AI structures.";
    }

    if (q.includes('skills') || q.includes('languages') || q.includes('technologies') || q.includes('stack')) {
      return "🛠️ **Nikhil's Core Tech Stack:**\n\n• **Languages:** Java, Python, SQL, JavaScript\n• **Frameworks:** Spring Boot, Spring Security, React, Next.js\n• **AI Tools:** LangChain, FAISS, OpenAI/Open-Source LLMs\n• **Automation:** Power Automate, scripting\n• **DevOps & DBs:** PostgreSQL, MySQL, Git, Streamlit, Cloudflare Pages";
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('linkedin') || q.includes('phone')) {
      return "✉️ You can connect with Nikhil directly through the contact form on this site, or reach out via:\n\n• **Email:** nikhilkudale.dev@gmail.com\n• **LinkedIn:** [linkedin.com/in/nikhil-kudale-dev/](https://linkedin.com/in/nikhil-kudale-dev/)\n• **GitHub:** [github.com/Nikhilkudale](https://github.com/Nikhilkudale)";
    }

    if (q.includes('education') || q.includes('university') || q.includes('college') || q.includes('jain')) {
      return "🎓 Nikhil graduated with a **Bachelor of Engineering (B.E.) in Computer Science and Engineering** from **Jain (Deemed-to-be University)**, where he developed a solid foundation in core Java, database design, and data visualization.";
    }

    return "💬 I'm not sure I understand that question. You can ask me about his work at Wipro, his projects (Cartly and RAG Chatbot), his education at Jain University, or his technical skills. Alternatively, click one of the suggested prompts below!";
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
