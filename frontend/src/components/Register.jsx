import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  
  const navigate = useNavigate() ;

  const closeModel = () => {
    navigate('/') ;
  }

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      phone: phone,
      email: email,
    };

    // Send the data to the backend
    try {
      const response = await fetch("http://backend-url.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
        navigate("/otp")
      } else {
        console.error("Login failed");
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="login_container">

      <div className="login_box">
        <p onClick={closeModel}>X</p>
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form_group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Input */}
          <div className="form_group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit_btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
