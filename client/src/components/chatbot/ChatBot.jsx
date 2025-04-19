import React, { useState } from 'react';
import './ChatBot.css';
import leftImg from '../../assets/remedies-1.jpg';
import rightImg from '../../assets/remedies-2.jpg';

const remedies = [
  "Drink Water",
  "Eat Fruits",
  "Get Enough Sleep",
  "Exercise Regularly",
  "Practice Meditation",
  "Maintain Balanced Diet",
];

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('Welcome! Ask me for health remedies.');

  const onAskRemedy = () => {
    // Simple logic: pick a random remedy from the list
    const randomRemedy = remedies[Math.floor(Math.random() * remedies.length)];
    setOutput(randomRemedy);
  };

  return (
    <div className='chat-bot'>
      <h1>Remedies Chatbot</h1>
      <div className="chat-bot-inner">
        <div className="side-image left">
          <img src={leftImg} alt="Health related" />
        </div>

        <div className="middle">
          <label htmlFor="chat" className="visually-hidden">Chat Input</label>
          <textarea
            id="chat"
            name="chat"
            rows="10"
            cols="70"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your health question here..."
            aria-label="Chat input area"
          />
          <p className="output">{output}</p>
          <button onClick={onAskRemedy} aria-label="Ask for remedies">
            Ask For Remedies
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
