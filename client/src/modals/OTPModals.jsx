import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ButtonLoading from "../components/Button/ButtonLoading";
import { verifySignupOTP } from "../services/operations/authApi";

function OTPModal({ otpModal, setOtpModal, signupData }) {
  // useRef
  const otpInputRefs = useRef([]);

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // useState
  const [loading, setLoading] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  // useEffect
  useEffect(() => {
    if (otpModal) {
      otpInputRefs.current[0]?.focus();
    }
  }, [otpModal]);

  if (!otpModal) return null;

  const closeModal = () => {
    setOtpModal(false);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (value.length > 1) {
      otpInputRefs.current[index].value = value[value.length - 1];
    }

    const currentValue = otpInputRefs.current[index].value;
    if (currentValue.length > 0 && /^[0-9]$/.test(currentValue)) {
      if (index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }

    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    setIsOtpComplete(otpValues.length === 6);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpInputRefs.current[index].value && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      } else {
        otpInputRefs.current[index].value = "";
      }
    }
  };

  const handleInputBlur = (e, index) => {
    const { value } = e.target;
    otpInputRefs.current[index].value =
      value.length > 1 ? value[value.length - 1] : value;
  };

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    const userRegisterData = {
      ...signupData,
      otp: otpValues,
    };
    dispatch(verifySignupOTP(userRegisterData, setOtpModal, navigate));
  };

  return ReactDOM.createPortal(
    <div className="otp-modal-overlay">
      <form className="otp-modal-container" onSubmit={otpSubmitHandler}>
        <div className="otp-modal-header">
          <h3>Email Verification</h3>
          <RxCross2 className="close-icon" onClick={closeModal} />
        </div>
        <p className="otp-modal-description">
          A six-digit OTP has been sent to your Email. Please enter it below to
          verify your Email.
        </p>
        <div className="otp-input-container">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              maxLength="1"
              ref={(el) => (otpInputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onBlur={(e) => handleInputBlur(e, index)} // Ensure value is updated on blur
            />
          ))}
        </div>
        <button
          className={` ${loading ? "spinner" : "otp-submit-btn"}`}
          disabled={!isOtpComplete}
        >
          {loading ? <ButtonLoading /> : <p>Submit</p>}
        </button>
      </form>
    </div>,
    document.getElementById("modal")
  );
}

export default OTPModal;
