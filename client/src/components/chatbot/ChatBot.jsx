import React, { useState } from 'react';
import './ChatBot.css';
import leftImg from '../../assets/remedies-1.jpg';
import rightImg from '../../assets/remedies-2.jpg';

const GROQ_API_KEY = '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'; 
const user = "Manjil";

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: `Welcome ${user}! Ask me for health remedies.` }
  ]);

  const callGroqAPI = async (prompt) => {
    const systemMessage = {
      role: 'system',
      content: `You are a helpful health assistant for ${user}. Follow these rules STRICTLY:
1. NEVER suggest remedies for critical diseases (cancer, heart attack, etc.).
2. ALWAYS recommend professional care for serious symptoms.
3. Give 3 bullet points max (10 words each).
4. Format each point on a new line like this:
• First point
• Second point
• Third point`,
    };

    const userMessage = {
      role: 'user',
      content: prompt
    };

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [systemMessage, userMessage],
        temperature: 0.3,
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const data = await res.json();
    return data.choices[0].message.content;
  };

  const onAskRemedy = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please enter a health-related question.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    
    // Add user message to chat history immediately
    const userMessage = { role: 'user', content: userInput };
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      const response = await callGroqAPI(userInput);
      const botMessage = { role: 'assistant', content: response };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.',
        isError: true
      }]);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAskRemedy(e);
    }
  };

  return (
    <div className="app-container">
      <div className="fixed-chat-interface">
        <header className="chat-header">
          <h1>Remedies Chatbot</h1>
          <p className="user-greeting">Hello, {user}</p>
        </header>

        <div className="chat-layout">
          {/* <div className="side-image left">
            <img src={leftImg} alt="Health related" />
          </div> */}

          <div className="chat-container">
            <div className="chat-messages">
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'} ${message.isError ? 'error-message' : ''}`}
                >
                  <div className="message-bubble">
                    {message.content.split('\n').map((line, i) => (
                      <div key={i} className="message-line">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message bot-message">
                  <div className="message-bubble loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form className="chat-input-form" onSubmit={onAskRemedy}>
              <textarea
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question here..."
                disabled={loading}
                rows="3"
                aria-label="Chat input area"
              />
              <button 
                type="submit" 
                disabled={loading || !userInput.trim()} 
                aria-label="Ask for remedies"
              >
                {loading ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>

          {/* <div className="side-image right">
            <img src={rightImg} alt="Health related" />
          </div> */}
        </div>

        <footer className="chat-footer">
          <p>Natural remedies for common ailments • Always consult with healthcare professionals</p>
        </footer>
      </div>

      {error && <div className="error-notification">{error}</div>}
    </div>
  );
};

export default ChatBot;