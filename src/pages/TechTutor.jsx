import React, { useState, useEffect, useRef } from 'react';
import '../styles/TechTutor.css';
import { motion, AnimatePresence } from 'framer-motion';

const TechTutor = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const introMessage = {
      role: 'bot',
      content:
        "📘 Hello! I'm TechTutor. I can assist you with Operating Systems, DBMS, Computer Networks, and general engineering theory.",
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
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace securely
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
        { role: 'bot', content: '⚠️ TechTutor ran into a problem. Try again.' },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="techtutor-container">
      <div className="techtutor-header">
        <span role="img" aria-label="bot">📘</span>
        <h2>TechTutor Bot</h2>
      </div>

      <div className="techtutor-window">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`techtutor-message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="techtutor-bubble">{msg.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <div className="techtutor-input-bar">
        <textarea
          rows={2}
          placeholder="Ask me about OS, DBMS, CN, theory concepts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default TechTutor;
