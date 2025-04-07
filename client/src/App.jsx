import React from "react";
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Footer from './components/footer/Footer'
import Testimonials from "./components/testimonials/Testimonials";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
