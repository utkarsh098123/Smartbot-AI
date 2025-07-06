import React, { useState, useEffect, useRef } from 'react';
import '../styles/ProjectPal.css';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectPal = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const introMessage = {
      role: 'bot',
      content:
        "📁 Hi! I'm ProjectPal. Ask me anything related to project ideas, documentation, abstracts, or presentations.",
    };
    setMessages([introMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();
      const botMessage = {
        role: 'bot',
        content: data.choices[0].message.content.trim(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: '⚠️ ProjectPal had an issue processing your request.' },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="projectpal-container">
      <div className="projectpal-header">
        <span role="img" aria-label="bot">📁</span>
        <h2>ProjectPal Bot</h2>
      </div>

      <div className="projectpal-window">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`projectpal-message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="projectpal-bubble">{msg.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <div className="projectpal-input-bar">
        <textarea
          rows={2}
          placeholder="Ask for project ideas, abstracts, reports, docs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ProjectPal;
