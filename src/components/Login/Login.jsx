import React from 'react'
import './login.css'

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="login-left">
            <img src="src/assets/dr2.png" alt="doctor-img" />
        </div>

        <div className="login-right">
            <div className="navbar">
                <div><a href="">Home</a></div>
                <div><a href="">About</a></div>
                <img src="src/assets/logo.png" />
                <div><a href="">FAQs</a></div>
                <div><a href="">Sign Up</a></div>
            </div>
            <div className="form">
                <h1>Login</h1>
                <form action="">
                    <input type="text" id="name" name="name" placeholder='Email'/>
                    <input type="password" id="password" name="password" placeholder='Password'/>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>

      </div>
    </>
  )
}

export default Login;
