import React from 'react'
import './Footer.css'
import {Link} from "react-router-dom"
import { Link as ScrollLink} from "react-scroll";

const Footer = () => {
  return (
    <div>
      <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-body-secondary">© 2025 Dr.CureX</p>

            <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
            </a>

            <ul class="nav col-md-4 justify-content-end">
              <li><Link to="/" className="nav-link px-2" style={{color: "#000000"}}>Home</Link></li>
              <li><ScrollLink to="about" className="nav-link px-2" style={{color: "#000000"}} smooth={true} duration={500}>Features</ScrollLink></li>
              <li><ScrollLink to="testimonials" className="nav-link px-2" style={{color: "#000000"}} smooth={true} duration={500}>Testimonials</ScrollLink></li>
              <li><Link to="/" className="nav-link px-2" style={{color: "#000000"}}>FAQs</Link></li>
            </ul>
        </footer>
     </div>
    </div>
  )
}

export default Footer
