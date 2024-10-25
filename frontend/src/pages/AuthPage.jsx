import React, { useState } from 'react';
import googleImage from '../assets/g_p.jpeg';
import './AuthPage.css';
import appleImage from '../assets/a_p.png';
import SignupModal from '../modals/SignupModal';
import OTPModal from '../modals/OTPModals';
import LoginModal from '../modals/LoginModal';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import UpdatePasswordModal from '../modals/UpdatePasswordModal';

// Initial Page on Screen
function AuthPage() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false) ;
  const [otpModal, setOtpModal] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const [resetModal, setResetModal] = useState(false) ;
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false) ;

  // email to send while changing password
  const [email, setEmail] = useState("") ;


  // to invoke signup modal
  const createAccountHandler = () => {
    setSignupModal(true);
    setOtpModal(false);
  };

  // to invoke login modal
  const loginAccountHandler = () => {
    setLoginModal(true) ;
  }


  return (
    <>
      <div className="auth-page">

        
          <div className="auth-info">
            <div className='name'>AbilitaEdge</div>
            <p>Transforming Your Abilities</p>
            <p>into Capabilities</p>
          </div>
        

        <div className="auth-content-section">

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

          {/* <h3 className="auth-already-account">Already have an account?</h3> */}

          <button className="auth-signin-btn" onClick={loginAccountHandler}>
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
      <LoginModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setResetModal={setResetModal}
      />
      <ResetPasswordModal
          setEmail={setEmail}
          resetModal={resetModal}
          setResetModal={setResetModal}
          setUpdatePasswordModal={setUpdatePasswordModal}
      />
      <UpdatePasswordModal
          email={email}
          updatePasswordModal={updatePasswordModal}
          setUpdatePasswordModal={setUpdatePasswordModal}
          setLoginModal={setLoginModal}
      />
    </>
  );
}

export default AuthPage;
