import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/ProjectPal.css';

const suggestions = [
  'Give me a React project idea.',
  'Suggest a Python ML project.',
  'Help me plan an e-commerce app.',
  'What are trending hackathon ideas?'
];

const ProjectPal = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newMessages = [...messages, { from: 'user', text: trimmed }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Here’s a smart project suggestion or guidance!' }]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="projectpal-wrapper">
      <main className="projectpal-main">
        <div className="hero-section">
          <h1>ProjectPal</h1>
          <p>Your AI partner for planning, brainstorming, and building projects.</p>
        </div>

        <div className="suggestion-section">
          {suggestions.map((text, i) => (
            <div className="suggestion-box" key={i} onClick={() => setInput(text)}>
              {text}
            </div>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message-wrapper ${msg.from}`}>
              <motion.div
                className={`chat-bubble ${msg.from}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.text}
              </motion.div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-bar">
          <input
            type="text"
            placeholder="Ask about projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProjectPal;
