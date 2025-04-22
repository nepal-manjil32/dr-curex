import React from 'react';
import './About.css';
import doctorImage from '../../assets/dr.webp'; // Add this image to your assets folder

const About = () => {
  return (
    <section className="about-us" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Dr. CureX</h2>
            <div className="title-underline"></div>
            
            <p className="about-description">
              Founded with a mission to make healthcare accessible and convenient, Dr. CureX is a comprehensive 
              health management platform. We connect patients with qualified healthcare providers, 
              offer essential health tools, and provide personalized medical information at your fingertips.
            </p>
            
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div className="feature-text">
                  <h3>Expert Physicians</h3>
                  <p>Connect with top specialists and general practitioners</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa-solid fa-mobile-screen"></i>
                </div>
                <div className="feature-text">
                  <h3>Digital Health Tools</h3>
                  <p>BMI calculators, medication reminders, and health tracking</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <div className="feature-text">
                  <h3>Hospital Network</h3>
                  <p>Find nearby hospitals and book ambulance services quickly</p>
                </div>
              </div>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <h3>10K+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Doctors</p>
              </div>
              <div className="stat">
                <h3>100+</h3>
                <p>Partner Hospitals</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <img src={doctorImage} alt="Healthcare professionals" />
            <div className="experience-badge">
              <span className="years">5</span>
              <span className="text">Years of Excellence</span>
            </div>
          </div>
        </div>
        
        <div className="mission-vision">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>To empower individuals with easy-to-use digital health tools and seamless access to quality healthcare services.</p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>A world where managing your health is as simple as checking your phone, and quality healthcare is accessible to everyone.</p>
          </div>
        </div>
        
        <div className="about-cta">
          <h3>Take control of your health journey today</h3>
          <button className="about-cta-button">Schedule an Appointment</button>
        </div>
      </div>
    </section>
  );
};

export default About;