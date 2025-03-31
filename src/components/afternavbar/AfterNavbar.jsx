import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink} from "react-scroll";
import "./AfterNavbar.css";

const AfterNavbar = () => {
  return (
    <div className="afternavbar">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link to="/"><img src="src/assets/logo.png" className="logo" alt="" /></Link>
          </div>

          <div className="col-md-3 text-end">
            <Link to="/dashboard" className="btn me-2" style={{ backgroundColor: "#4CAF50", color: "white" }}>Dashboard</Link>
            <Link to="/" className="btn" style={{ backgroundColor: "#FF6F00", color: "white" }}>Logout</Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default AfterNavbar;
