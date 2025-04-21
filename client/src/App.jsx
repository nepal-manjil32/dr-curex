import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Testimonials from './components/testimonials/Testimonials';

// Simplified App component - removed Routes since they're handled in Main.jsx
const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
    </div>
  );
};

export default App;