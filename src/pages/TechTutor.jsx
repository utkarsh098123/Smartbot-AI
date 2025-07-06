import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/TechTutor.css';

const suggestions = [
  'What is a deadlock in OS?',
  'Difference between TCP & UDP?',
  'Create a Java login form.',
  'What is normalization in DBMS?'
];

const TechTutor = () => {
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
      setMessages((prev) => [...prev, { from: 'bot', text: 'This is a response from AI.' }]);
    }, 500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="techtutor-wrapper">
      <main className="techtutor-main">
        <div className="hero-section">
          <h1>TechTutor</h1>
          <p>Your smart coding assistant for quick help & inspiration.</p>
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
            <div
              key={i}
              className={`chat-message-wrapper ${msg.from}`}
            >
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
            placeholder="Ask me anything..."
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

export default TechTutor;
