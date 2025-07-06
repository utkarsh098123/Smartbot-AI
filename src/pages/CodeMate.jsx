import React, { useState, useEffect, useRef } from 'react';
import '../styles/CodeMate.css';
import { motion, AnimatePresence } from 'framer-motion';

const CodeMate = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Intro message
    const introMessage = {
      role: 'bot',
      content: "👨‍💻 Hey! I'm CodeMate. Share your code, errors, or logic and I'll help you debug it.",
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
        { role: 'bot', content: '⚠️ CodeMate encountered an issue.' },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="codemate-container">
      <div className="codemate-header">
        <span role="img" aria-label="bot">💡</span>
        <h2>CodeMate Bot</h2>
      </div>

      <div className="codemate-window">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`codemate-message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="codemate-bubble">{msg.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      <div className="codemate-input-bar">
        <textarea
          rows={2}
          placeholder="Paste your code, error, or logic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default CodeMate;
