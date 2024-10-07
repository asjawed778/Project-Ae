import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; 
import "./Otp.css"; 

function Otp() {
 
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  
  const navigate = useNavigate(); 

  const closePage = () => {
    navigate("/register")
  }

  const handleVerify = async (event) => {
    event.preventDefault();
    setIsLoading(true); 

    try {
      // Send the OTP to the backend for verification
      const response = await fetch("http://backend-url.com/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }), 
      });

      const data = await response.json() ;

      if ( data.verified ) { 
         
        navigate("/") ;                  
        alert("OTP verified successfully!"); 
        
      } else {
        alert("OTP verification failed. Please try again.");
      }

import { useNavigate } from "react-router-dom";
import "./Otp.css";

function Otp() {

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleVerify = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
    // Send the OTP to the backend for verification
    const response = await fetch("http://backend-url.com/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }), 
    });

    const data = await response.json() ;


    } catch (error) {

      console.error("Error verifying OTP:", error);

    } finally {

      setIsLoading(false); // Hide loading state

    }
  };

  return (

    <div className="otp_wrapper">

      
      <div className="otp_box">
        
        <p onClick={closePage}>X</p>


      <div className="otp_box">


        <h2>Verify OTP</h2>

        <form onSubmit={handleVerify}>

          {/* OTP Input */}
          <div className="form_group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="OTP sent to your email"
            />
          </div>

          {/* Verify Button */}
          <button type="submit" className="submit_btn" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

      </div>

      

    </div>

  );
}

export default Otp;
