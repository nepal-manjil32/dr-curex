import React from 'react';
import './Remedies.css';
import AfterNavbar from '../../components/afternavbar/AfterNavbar.jsx'

const Remedies = () => {
  return (
    <>
      <AfterNavbar/>
      <div className="remedies">
        <div className="heading">
          <img src="src/assets/mortar.png" alt="Mortar and Pestle" className="logo"style={{width:"10%"}}/>
          <h2>Remedies For Your Symptoms</h2>
        </div>

        <div className="check-remedies">
          <h3>Describe Your Symptoms</h3>
          <textarea
            name="symptoms"
            id="symptoms"
            rows="10"
            placeholder="Enter your symptoms here..."
            aria-label="Describe your symptoms"
          ></textarea>
          <button>Analyze Symptom</button>
        </div>
      </div>
    </>
  );
};

export default Remedies;
