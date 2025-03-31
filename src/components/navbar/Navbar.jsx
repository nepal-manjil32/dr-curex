import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink} from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/"><img src="src/assets/logo.png" className="logo" alt="" /></Link>
          </div>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2" style={{color: "#000000"}}>Home</Link></li>
            <li><ScrollLink to="about" className="nav-link px-2" style={{color: "#000000"}} smooth={true} duration={500}>Features</ScrollLink></li>
            <li><ScrollLink to="testimonials" className="nav-link px-2" style={{color: "#000000"}} smooth={true} duration={500}>Testimonials</ScrollLink></li>
            <li><Link to="/" className="nav-link px-2" style={{color: "#000000"}}>FAQs</Link></li>
          </ul>

          <div className="col-md-3 text-end">
            <Link to="/login" className="btn me-2" style={{ backgroundColor: "#4CAF50", color: "white" }}>Login</Link>
            <Link to="/signup" className="btn" style={{ backgroundColor: "#FF6F00", color: "white" }}>Sign-up</Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
