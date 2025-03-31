import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom" style={{ textAlign: "center" }}>Features</h2>
        <div className="row g-1 py-3 row-cols-1 row-cols-lg-3" style={{gap: "5px"}}>
          
          <div className="col d-flex align-items-start about-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/diagnosis.png" alt="image" style={{ width: "80px", height: "80px"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">AI-Powered Diagnosis</h3>
              <p>
                Our LLM-driven system analyzes symptoms and medical history to assist healthcare professionals in making informed decisions.
              </p>
            </div>
          </div>

          <div className="col d-flex align-items-start about-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/personalized.png" alt="image" style={{ width: "80px", height: "80px"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">Personalized Health Insights</h3>
              <p>
                Using advanced AI, we generate personalized health insights based on real-time data, helping users take proactive steps toward better well-being.
              </p>
            </div>
          </div>

          <div className="col d-flex align-items-start about-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/247.png" alt="image" style={{ width: "80px", height: "80px"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">24/7 Virtual Health Assistant</h3>
              <p>
              Our AI-powered chatbot provides real-time answers to health queries, medication guidance, and lifestyle recommendations anytime, anywhere.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
