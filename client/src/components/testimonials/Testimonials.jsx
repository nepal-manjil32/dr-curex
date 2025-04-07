import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="testimonials">
      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom" style={{ textAlign: "center" }}>Testimonials</h2>
        <div className="row g-1 py-3 row-cols-1 row-cols-lg-3" style={{gap: "5px"}}>
          
          <div className="col d-flex align-items-center testiomonials-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/hawking.webp" alt="image" style={{ width: "80px", height: "80px", borderRadius:"50%"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">Dr. Stephen Hawking</h3>
              <p>
                Our LLM-driven system analyzes symptoms and medical history to assist healthcare professionals in making informed decisions.
              </p>
            </div>
          </div>

          <div className="col d-flex align-items-center testiomonials-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/hawking.webp" alt="image" style={{ width: "80px", height: "80px", borderRadius:"50%"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">Dr. Stephen Hawking</h3>
              <p>
                Our LLM-driven system analyzes symptoms and medical history to assist healthcare professionals in making informed decisions.
              </p>
            </div>
          </div>

          <div className="col d-flex align-items-center testiomonials-card" style={{width:"33%"}}>
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
            style={{ width: "80px", height: "80px" }}>
              <img src="src/assets/hawking.webp" alt="image" style={{ width: "80px", height: "80px", borderRadius:"50%"}}/>
            </div>
            <div>
              <h3 className="fs-4 text-body-emphasis">Dr. Stephen Hawking</h3>
              <p>
                Our LLM-driven system analyzes symptoms and medical history to assist healthcare professionals in making informed decisions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Testimonials;
