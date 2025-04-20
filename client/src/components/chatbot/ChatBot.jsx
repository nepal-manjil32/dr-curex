import React, { useState } from 'react';
import './ChatBot.css';
import leftImg from '../../assets/remedies-1.jpg';
import rightImg from '../../assets/remedies-2.jpg';

const GROQ_API_KEY = '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'; // Replace with your API key
const user = "Manjil"

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState(`Welcome ${user}! Ask me for health remedies.`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callGroqAPI = async (prompt) => {
    const systemMessage = {
      role: 'system',
      content: `You are a helpful health assistant for ${user}. Follow these rules STRICTLY:
1. NEVER suggest remedies for critical diseases (cancer, heart attack, etc.).
2. ALWAYS recommend professional care for serious symptoms.
3. Give 3 bullet points max (10 words each).
4. Format each point on a new line like this:
First point
Second point
Third point`,
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
        temperature: 0.3, // Lower temperature for more predictable responses
      }),
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const data = await res.json();
    return data.choices[0].message.content;
  };

  const onAskRemedy = async () => {
    if (!userInput.trim()) {
      setOutput('Please enter a health-related question.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput('');

    try {
      const response = await callGroqAPI(userInput);
      // Split the response into lines
      const formattedOutput = response.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ));
      setOutput(formattedOutput);
    } catch (err) {
      setError(err.message);
      setOutput('Failed to get response. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-bot">
      <h1>Remedies Chatbot</h1>
      <div className="chat-bot-inner">
        <div className="side-image left">
          <img src={leftImg} alt="Health related" />
        </div>

        <div className="middle">
          <label htmlFor="chat" className="visually-hidden">Chat Input</label>
          <textarea
            id="chat"
            rows="5"
            cols="70"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder="Type your health question here..."
            disabled={loading}
            aria-label="Chat input area"
          />
          {loading ? (
            <p className="output loading">Getting you the best remedies...</p>
          ) : error ? (
            <p className="output error">{error}</p>
          ) : (
            <div className="output">{output}</div>
          )}
          <button onClick={onAskRemedy} disabled={loading} aria-label="Ask for remedies">
            {loading ? 'Loading...' : 'Ask For Remedies'}
          </button>
        </div>

        <div className="side-image right">
          <img src={rightImg} alt="Health related" />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
