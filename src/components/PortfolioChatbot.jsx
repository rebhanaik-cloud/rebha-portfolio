import { useState, useRef, useEffect, useCallback } from 'react';
import { generateBotResponse } from '../data/portfolioData';
import './PortfolioChatbot.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi there! 👋 I'm Rebha's AI companion. Ask me anything about Rebha's projects (like Arogyamitra or her Smart India Hackathon solutions), skills, education at BMSIT&M, or career opportunities!",
    suggestions: [
      'Tell me about your SIH projects',
      'What are your core skills?',
      'Tell me about Arogyamitra',
      'How can I contact you?'
    ],
    timestamp: 'Just now'
  }
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setUnreadCount(0);
      return next;
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = useCallback((queryText) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = generateBotResponse(textToSend);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        suggestions: response.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 650);
  }, [inputValue, isTyping]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  // Helper to format bold and bullets simply
  const renderMessageContent = (text) => {
    return text.split('\n').map((line, idx) => {
      if (!line.trim()) return <br key={idx} />;

      // Format bold markdown (**text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={idx} className="chat-line">
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <aside className="chatbot-root" aria-label="Interactive AI Portfolio Chatbot">
      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`chatbot-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={handleToggleChat}
        aria-label={isOpen ? 'Close portfolio chatbot' : 'Open AI portfolio chatbot'}
        aria-expanded={isOpen}
      >
        <div className="toggle-avatar-ring">
          <img
            src="/character.png"
            alt="Rebha Avatar"
            className="toggle-avatar-img"
          />
          <span className="online-indicator-dot" />
        </div>
        <span className="toggle-label">Ask Rebha AI</span>
        {unreadCount > 0 && !isOpen && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-modal="true" aria-label="Chat with Rebha's AI">
          {/* Header */}
          <div className="chat-header">
            <div className="header-character-info">
              <div className="header-avatar-wrap">
                <img
                  src="/character.png"
                  alt="Rebha Avatar"
                  className="header-avatar-img"
                />
                <span className="header-status-dot" />
              </div>
              <div className="header-text">
                <h3>Rebha AI Companion</h3>
                <span className="header-subtitle">Interactive Portfolio Assistant</span>
              </div>
            </div>

            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
            >
              ✕
            </button>
          </div>

          {/* Messages Thread */}
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="message-bot-avatar">
                    <img src="/character.png" alt="Bot avatar" />
                  </div>
                )}
                <div className="message-bubble-group">
                  <div className="message-bubble">
                    {renderMessageContent(msg.text)}
                  </div>

                  {msg.timestamp && (
                    <span className="message-timestamp">{msg.timestamp}</span>
                  )}

                  {/* Quick Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="chat-suggestions-row">
                      {msg.suggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(suggestion)}
                          disabled={isTyping}
                        >
                          ✦ {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="message-row bot">
                <div className="message-bot-avatar">
                  <img src="/character.png" alt="Bot avatar" />
                </div>
                <div className="typing-indicator-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form className="chat-input-bar" onSubmit={handleFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input-field"
              placeholder="Ask about projects, hackathons, skills..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
