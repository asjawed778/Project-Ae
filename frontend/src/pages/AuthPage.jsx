import React, { useState } from 'react';
import googleImage from '../assets/g_p.jpeg';
import './AuthPage.css';
import appleImage from '../assets/a_p.png';
import SignupModal from '../modals/SignupModal';
import OTPModal from '../modals/OTPModals';

function AuthPage() {
  const [signupModal, setSignupModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const createAccountHandler = () => {
    setSignupModal(true);
    setOtpModal(false);
  };


  return (
    <>
      <div className="auth-page">
        <div className="auth-logo-section">
          <div className="auth-logo">X</div>
        </div>

        <div className="auth-content-section">
          <h1 className="auth-main-heading">Happening now</h1>
          <h2 className="auth-subheading">Join today.</h2>
          <button className="auth-signup-btn auth-google-btn">
            <img src={googleImage} alt="Google" />
            <p>Sign up with Google</p>
          </button>
          <button className="auth-signup-btn auth-apple-btn">
            <img src={appleImage} alt="Apple" />
            <p>Sign up with Apple</p>
          </button>
          <div className="auth-divider">
            <hr />
            <span>or</span>
            <hr />
          </div>
          <button className="auth-create-account-btn" onClick={createAccountHandler}>
            Create account
          </button>
          <p className="auth-terms">
            By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including <a href="#">Cookie Use</a>.
          </p>
          <h3 className="auth-already-account">Already have an account?</h3>
          <button className="auth-signin-btn">
            SignIn
          </button>
        </div>
      </div>
      <SignupModal
        signupModal={signupModal}
        setSignupModal={setSignupModal}
        setOtpModal={setOtpModal}
        setSignupData={setSignupData}
      />
      <OTPModal
        otpModal={otpModal}
        setOtpModal={setOtpModal}
        signupData={signupData} 
      />
    </>
  );
}

export default AuthPage;
