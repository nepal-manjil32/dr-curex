import React from 'react'
import './Hero.css'
import doctor from '../../assets/dr.webp'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="left">
        <img src={doctor} alt="" />
      </div>

      <div className="right">
          <h1>FROM SYMPTOMS TO SOLUTIONS</h1>
          <h4>"From Symptoms to Solutions – Get AI-Powered Insights and Personalized Healthcare Recommendations Instantly."</h4>
          <div>
            <Link className='get-started'>Get Started</Link>
            <Link className='learn-more'>Learn More</Link>
          </div>
      </div>
    </div>
  )
}

export default Hero
