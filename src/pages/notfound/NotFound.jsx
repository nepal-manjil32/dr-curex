import React from "react";
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <>
        <div className="component-container">
            <h1>404 Sorry Page Not Found!</h1>
            <Link to="/">Home</Link>
        </div>
    </>
  );
};

export default NotFound;
