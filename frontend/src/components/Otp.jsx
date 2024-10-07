import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Otp.css"; 


function Otp() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const closeModel = () => {
    navigate('/login') ;
  }

  const handleVerify = async (event) => {
    event.preventDefault();

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

    } 
  };

  return (

    <div className="otp_wrapper">

      
      <div className="otp_box">
        <p onClick={closeModel}>X</p>

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
          <button type="submit" className="submit_btn">Submit
          </button>
        </form>

      </div>

      

    </div>

  );
}

export default Otp;
