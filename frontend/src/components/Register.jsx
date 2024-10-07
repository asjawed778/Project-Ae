import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

  
  const navigate = useNavigate() ;

  const closeModel = () => {
    navigate('/') ;
  }


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("") ;
  const [confirmpassword, setConfirmPassword] = useState("") ;

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();


    if( password !=  confirmpassword ){
      alert("You have entered wrong password");
    }


    const userData = {
      name: name,
      email: email,
      password:password 
    };

    try {
      const response = await fetch("http://127.0.0.1:4000/api/v1/send-signup-otp", {

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
    }finally{
      console.error("Error sending data to backend:", error.message);
    }

  }

    

  

  return (
    <div className="login_container">


      <div className="register_box">

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


          {/* Phone Input */}
          <div className="form_group">

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="phone"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

         

          {/* Phone Input */}
          <div className="form_group">

            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="phone"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit_btn">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}


export default Register;
