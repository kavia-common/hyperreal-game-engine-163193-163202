import React, { useState } from 'react';
import { chatWithAssistant } from '../../core/services/aiService';

/**
 * AIAssistant: chat assistant for help and code suggestions.
 */
// PUBLIC_INTERFACE
export function AIAssistant() {
  /** Simple chat interface using aiService stubs. */
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Ask me to generate nodes, assets, or plugins.' }
  ]);
  const [input, setInput] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    const reply = await chatWithAssistant(next);
    setMessages((prev) => [...prev, reply]);
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className="console-item" style={{ color: m.role === 'assistant' ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input className="input" placeholder="Ask AI to add a camera with Niagara VFX..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="btn" onClick={send}>Send</button>
      </div>
    </div>
  );
}
