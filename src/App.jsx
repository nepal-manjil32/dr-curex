import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import "./App.css"

const App = () => {
  return (
    <>
      <div className="landing">
        <div className="landing-left">
            <img src="src/assets/dr.jpg" alt="" />
        </div>
        <div className="landing-right">
          <Navbar />
          <div className='landing-right-lower'>
            <div>
              <h1>FROM SYMPTOMS TO SOLUTIONS</h1>
              <h2>AI-DRIVEN HEALTHCARE FOR YOU</h2>
            </div>

            <div>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
              Proin hendrerit nunc pharetra elit
              </p>
            </div>

            <div className='landing-right-lower-btn'>
              <div>
                <a href="" className='left'>Get Started</a>
              </div>
              <div>
              <a href="" className='right'>Read More</a>
              </div>
            </div>

            <div className='offer'>
              <p>SPECIAL DISCOUNT </p>
              <p style={{ fontWeight: '600' }}>UP TO 40% FOR FIRST-TIME USERS</p>
            </div>

          </div>
        </div>
      </div>

      <div className='rest'>

      </div>
    </>
  )
}

export default App
