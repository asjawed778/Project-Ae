import React, { useState } from "react";
import "./Navbar.css"; // Import the CSS for styling
import { Link } from "react-router-dom";
import Login from "./Login";

import googleImage from '../assets/g_p.jpeg' ;
import appleImage from  '../assets/a_p.png' ;


function Navbar() {
  

  return (
    
  <div className="login-page">

      <div className="logo-section">
        <div className="logo">X</div>
      </div>

      <div className="content-section">
        <h1>Happening now</h1>
        <h2>Join today.</h2>
        <button className="signup-btn google-btn">
          <img src={googleImage} alt="not found" width={30}/>
          <p>Sign up with Google</p>
          
          
        </button>
        <button className="signup-btn apple-btn">
          <img src={appleImage} alt="not found" width={50}/>
          <p>Sign up with Apple</p>
        </button>
        <div className="divider">
          <hr/>
          or
          <hr/>
        </div>

        <button className="create-account-btn">
          <Link to="/register" className="btn-link">Create account</Link>
        </button>

        <p className="terms">
          By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a>.
        </p>

        <h3>Already have an account?</h3>

        <button className="signin-btn">
          <Link to="/login" className="btn-link">Sign in</Link>
        </button>

      </div>

  </div>
    
  );
}

export default Navbar;

