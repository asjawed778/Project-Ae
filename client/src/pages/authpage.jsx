import logo from "../../public/logo.svg";
import googleImage from "../../public/imgs/google.svg";
import appleImage from "../../public/imgs/apple.svg";

import { useState } from "react";

// import './AuthPage.css';
import SignupModal from "../modals/SignupModal";
import OTPModal from "../modals/OTPModals";
import LoginModal from "../modals/LoginModal";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import UpdatePasswordModal from "../modals/UpdatePasswordModal";
import { Link } from "react-router-dom";

// Initial Page on Screen
function AuthPage() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const [resetModal, setResetModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);

  // email to send while changing password
  const [email, setEmail] = useState("");

  // to invoke signup modal
  const createAccountHandler = () => {
    setSignupModal(true);
    setOtpModal(false);
  };

  // to invoke login modal
  const loginAccountHandler = () => {
    setLoginModal(true);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between h-screen py-10 px-20">
        {/* First Row */}
        <div className="flex flex-col items-start gap-2 mb-6 mx-auto">
          <img src={logo} alt="logo" className="w-[450px]" />
          <p className="font-bold text-lg text-gray-600 flex flex-col ml-3">
            <span>Transforming Your Abilities</span>
            <span>into Capabilities</span>
          </p>
        </div>

        {/* Second Row */}
        <div className="flex flex-col gap-5 w-[25rem] mx-auto">
          <button className="hover:bg-gray-100 flex items-center justify-center px-5 py-3 border border-black rounded-full duration-300 cursor-pointer">
            <img src={googleImage} alt="Google" className="h-5 w-fit" />
            <p>Sign up with Google</p>
          </button>

          <button className="hover:bg-gray-100 flex items-center justify-center px-5 py-3 border border-black rounded-full duration-300 cursor-pointer">
            <img src={appleImage} alt="Apple" className="h-5 w-fit" />
            <p>Sign up with Apple</p>
          </button>

          <div className="relative">
            <span className="absolute -top-[15px] left-[50%] text-lg text-gray-400 bg-white px-2">
              or
            </span>
            <hr />
          </div>

          <button
            className="text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] px-5 py-3 rounded-full duration-300 cursor-pointer"
            onClick={createAccountHandler}
          >
            Create account
          </button>

          <p className="text-gray-600 text-sm">
            <span>By signing up, you agree to the </span>
            <Link to="" className="text-[var(--color-primary)]">
              Terms of Service
            </Link>
            <span> and </span>
            <Link to="" className="text-[var(--color-primary)]">
              Privacy Policy
            </Link>
            <span>, including </span>
            <Link to="" className="text-[var(--color-primary)]">
              Cookie Use.
            </Link>
          </p>

          <button
            className="text-[var(--color-primary)] hover:text-white hover:bg-[var(--color-primary)] active:bg-[var(--color-primary-active)] border border-[var(--color-primary)] px-5 py-3 rounded-full duration-300 cursor-pointer"
            onClick={loginAccountHandler}
          >
            SignIn
          </button>
        </div>
      </div>

      <SignupModal
        signupModal={signupModal}
        setSignupModal={setSignupModal}
        setOtpModal={setOtpModal}
        setSignupData={setSignupData}
        setLoginModal={setLoginModal}
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
        setSignupModal={setSignupModal}
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
