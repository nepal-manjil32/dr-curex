import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <div className="landing-page">
        <div className="landing-left">
          <img src="src/assets/dr.jpg" alt="doctor-img" />
        </div>
        <div className="landing-right">
          <Navbar />
          <h1>FROM SYMPTOMS TO SOLUTIONS</h1>
          <h2>AI-DRIVEN HEALTHCARE FOR YOU</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin <br />hendrerit nunc pharetra elit vehicula blandit. Curabitu
          </p>

          <div className="button-container">
            <div className="getting-started">
              <a href="">Gettng Started</a>
            </div>
            <div className="read-more">
              <a href="">Read More</a>
            </div>
          </div>
          <h3>SPECIAL DISCOUNT</h3>
          <h3>UPTO 40% FOR FIRST TIME USERS</h3>
        </div>
      </div>
    </>
  );
};

export default App;
