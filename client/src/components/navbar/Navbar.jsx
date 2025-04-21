import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__logo-container">
          <Link to="/" className="navbar__logo-link">
            <img src="/src/assets/logo.png" alt="Company Logo" className="navbar__logo" />
          </Link>
        </div>

        {/* Mobile hamburger menu */}
        <button 
          className={`navbar__mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar__links ${mobileMenuOpen ? 'navbar__links--open' : ''}`}>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Home</Link>
          </li>
          <li className="navbar__item">
            <ScrollLink 
              to="about" 
              className="navbar__link"
              smooth={true} 
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </ScrollLink>
          </li>
          <li className="navbar__item">
            <ScrollLink 
              to="testimonials" 
              className="navbar__link"
              smooth={true} 
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </ScrollLink>
          </li>
          <li className="navbar__item">
            <Link to="/faq" className="navbar__link">FAQs</Link>
          </li>
        </ul>

        {/* CTA buttons */}
        <div className="navbar__actions">
          <Link to="/login" className="navbar__button navbar__button--secondary">Login</Link>
          <Link to="/signup" className="navbar__button navbar__button--primary">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;