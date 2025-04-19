import React from 'react';
import { Link } from 'react-router-dom';
import './Notfound.css';
import image from '../../assets/prayash-1.jpeg';

const Notfound = () => {
  return (
    <div className='not-found-container'>
      <div className='not-found-content'>
        <div className='not-found-header'>
          <h1>404</h1>
          <div className='not-found-divider'></div>
          <h2>Page Not Found</h2>
        </div>
        
        <div className='not-found-image'>
          <img src={image} alt="Page not found" />
        </div>
        
        <p className='not-found-message'>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className='not-found-actions'>
          <Link to="/" className='home-button'>
            Return to Home
          </Link>
          <button 
            className='back-button'
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notfound;