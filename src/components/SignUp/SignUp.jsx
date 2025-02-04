import React from 'react'
import './SignUp.css'
import Footer from '../Footer/Footer'

const SignUp = () => {
  return (
    <>
      <div className="signup">
        <div className="signup-left">
            <img src="src/assets/dr2.png" alt="doctor-img" />
        </div>

        <div className="signup-right">
            <div className="navbar">
                <div><a href="">Home</a></div>
                <div><a href="">About</a></div>
                <img src="src/assets/logo.png" />
                <div><a href="">FAQs</a></div>
                <div><a href="">Login</a></div>
            </div>
            <div className="form">
                <h1>Sign Up</h1>
                <form action="">
                    <input type="text" id="name" name="name" placeholder='Email'/>
                    <input type="password" id="password" name="password" placeholder='Password'/>
                    <input type="" id="password" name="dob" placeholder='Date of birth (mm/dd/yyyy)'/>
                    <input type="text" id="password" name="password" placeholder='Gender'/>
                    <input type="text" id="name" name="name" placeholder='Country'/>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp;
