import React from 'react';
import './Hero.css';
import doctor from '../../assets/dr.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__image-container">
          <img src={doctor} alt="Healthcare professional" className="hero__image" />
        </div>

        <div className="hero__content">
          <h1 className="hero__title">FROM SYMPTOMS TO SOLUTIONS</h1>
          <h4 className="hero__subtitle">
            From Symptoms to Solutions – Get AI-Powered Insights and Personalized 
            Healthcare Recommendations Instantly.
          </h4>
          <div className="hero__buttons">
            <Link to="/login" className="hero__button hero__button--primary">
              Get Started
            </Link>
            <Link to="/about" className="hero__button hero__button--secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;