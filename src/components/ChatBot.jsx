import React, { useState, useEffect } from 'react';
import './ChatBot.css';
import useAudit from '../hooks/useAudit';

/**
 * Simple chatbot component for answering website‑specific questions.
 *
 * Flow:
 * 1. Mount and load any persisted conversation from localStorage.
 * 2. Provide a button to open/close the chat window.
 * 3. Use an input field to send a query to an endpoint (e.g., /api/chat).
 * 4. Append the message, store history, and call useAudit for logging.
 * @example
 * // In App.jsx
 * import ChatBot from './components/ChatBot';
 *
 * function App() {
 *   return (
 *     <div>
 *       {/* other app content */}
 *       <ChatBot />
 *     </div>
 *   );
 * }
 */

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Load persisted history
  useEffect(() => {
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (_) {}
    }
  }, []);

  // Persist history on change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user', content: input.trim(), time: new Date().toISOString() };
    setMessages(prev => [...prev, newMsg]);
    useAudit(`[AUDIT] User asked: ${input.trim()}`);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newMsg.content }),
      });
      const data = await res.json();
      const reply = { role: 'bot', content: data.reply, time: new Date().toISOString() };
      setMessages(prev => [...prev, reply]);
      useAudit(`[AUDIT] Bot replied: ${data.reply}`);
    } catch (err) {
      const errMsg = { role: 'error', content: 'Failed to get response', time: new Date().toISOString() };
      setMessages(prev => [...prev, errMsg]);
      useAudit(`[AUDIT] Chat error: ${err}`);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setOpen(!open)} aria-label="Toggle chat">
        {open ? '✖' : '💬'}
      </button>
      {open && (
        <div className="chatbot-window" role="dialog" aria-modal="true" aria-label="Chat window">
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-message ${m.role}`}>{m.content}</div>
            ))}
          </div>
          <textarea
            className="chatbot-input"
            placeholder="Ask about the website…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Chat input"
          />
        </div>
      )}
    </div>
  );
}
