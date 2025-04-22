import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Testimonials.css';

// Import your placeholder avatars or use these URLs
const avatars = [
  'https://randomuser.me/api/portraits/women/1.jpg',
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/2.jpg',
  'https://randomuser.me/api/portraits/women/3.jpg',
];

const testimonialData = [
  {
    id: 1,
    name: 'Emma Thompson',
    role: 'Patient',
    avatar: avatars[0],
    rating: 5,
    text: 'The dashboard is incredibly intuitive! I can track my appointments, check my health metrics, and find nearby hospitals all in one place. This app has simplified my healthcare journey tremendously.',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Healthcare Professional',
    avatar: avatars[1],
    rating: 5,
    text: 'As a doctor, I appreciate how this platform streamlines patient communication. The appointment scheduling system is efficient, and the interface is clean and professional.',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Regular User',
    avatar: avatars[2],
    rating: 4,
    text: 'I\'ve been using this health dashboard for 6 months now, and it has become an essential part of managing my family\'s healthcare needs. The BMI calculator and remedy suggestions are particularly helpful.',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Hospital Administrator',
    avatar: avatars[3],
    rating: 5,
    text: 'The integration with our hospital network has been seamless. Patients can easily find our facilities and book appointments. It\'s a win-win for both healthcare providers and patients.',
  },
  {
    id: 5,
    name: 'Lisa Patel',
    role: 'Patient with Chronic Condition',
    avatar: avatars[4],
    rating: 5,
    text: 'Managing my chronic condition has become much easier with this platform. I can track my appointments, check nearby pharmacies, and get timely health information all from one dashboard.',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayTimerRef = useRef(null);
  const testimonialRef = useRef(null);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`} aria-hidden="true">
        ★
      </span>
    ));
  };

  // Navigate to previous testimonial
  const prevTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
    resetAutoplay();
  }, []);

  // Navigate to next testimonial
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoplay();
  }, []);

  // Set specific testimonial as active
  const setTestimonial = useCallback((index) => {
    setActiveIndex(index);
    resetAutoplay();
  }, []);

  // Reset autoplay timer
  const resetAutoplay = () => {
    setIsAutoplay(false);
    clearTimeout(autoplayTimerRef.current);
    autoplayTimerRef.current = setTimeout(() => {
      setIsAutoplay(true);
    }, 10000); // Resume autoplay after 10 seconds of inactivity
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (testimonialRef.current && testimonialRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          prevTestimonial();
        } else if (e.key === 'ArrowRight') {
          nextTestimonial();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevTestimonial, nextTestimonial]);

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left -> next testimonial
      nextTestimonial();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right -> previous testimonial
      prevTestimonial();
    }
  };

  // Autoplay testimonials
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay, activeIndex]);

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Users Say</h2>
        <div className="testimonials-underline" aria-hidden="true"></div>
        
        <div 
          className="testimonials-wrapper" 
          ref={testimonialRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region" 
          aria-label="User testimonials carousel"
        >
          <button 
            className="nav-button prev" 
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">‹</span>
          </button>
          
          <div className="testimonial-slider">
            {testimonialData.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                aria-hidden={index !== activeIndex}
                role="tabpanel"
                id={`testimonial-${testimonial.id}`}
                aria-labelledby={`testimonial-tab-${testimonial.id}`}
              >
                <div className="testimonial-content">
                  <div className="quote-icon" aria-hidden="true">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-rating" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={testimonial.avatar} alt="" aria-hidden="true" loading="lazy" />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="nav-button next" 
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
        
        <div className="testimonial-dots" role="tablist" aria-label="Select a testimonial">
          {testimonialData.map((testimonial, index) => (
            <button 
              key={index} 
              id={`testimonial-tab-${testimonial.id}`}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setTestimonial(index)}
              aria-selected={index === activeIndex}
              aria-controls={`testimonial-${testimonial.id}`}
              role="tab"
              aria-label={`Testimonial by ${testimonial.name}`}
            ></button>
          ))}
        </div>
        
        <div className="testimonials-cta">
          <p>Join thousands of satisfied users today!</p>
          <a href="/signup" className="testimonial-cta-button">Sign Up Now</a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;