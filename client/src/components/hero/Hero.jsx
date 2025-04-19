import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="container col-xxl-8 px-4 py-1">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-1">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="src/assets/dr.webp"
              className="d-block mx-lg-auto img-fluid doctor"
              alt="Bootstrap Themes"
              width="500"
              height="400"
              loading="lazy"
            />
          </div>

          <div className="col-lg-6 hero-div">

            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3" style={{textAligncent: "center"}}>
              FROM SYMPTOMS TO SOLUTIONS
            </h1>

            <p className="lead">
            "From Symptoms to Solutions – Get AI-Powered Insights and Personalized Healthcare Recommendations Instantly."
            </p>

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/signup" className="btn btn-lg px-4 me-md-2 read-more" style={{ backgroundColor: "#4CAF50", color: "white" }}>
                Get Started
              </Link>
              
              <Link to="/about" className="btn btn-lg px-4 get-started" style={{ backgroundColor: "#FF6F00", color: "white" }}>
                Read More
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
