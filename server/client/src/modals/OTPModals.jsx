import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ButtonLoading from "../components/Button/ButtonLoading";
import { verifySignupOTP } from "../services/operations/authApi";


/**
 * OTPModal Component - Handles OTP verification for signup.
 * 
 * @param {Object} props - Component properties.
 * @param {boolean} props.otpModal - State to control the visibility of the modal.
 * @param {Function} props.setOtpModal - Function to update modal visibility state.
 * @param {Object} props.signupData - User data including email and other details.
 */
function OTPModal({ otpModal, setOtpModal, signupData }) {
  const otpInputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  useEffect(() => {
    if (otpModal) {
      otpInputRefs.current[0]?.focus();
    }
  }, [otpModal]);

  if (!otpModal) return null;

  /**
   * Closes the OTP modal.
   */
  const closeModal = () => {
    setOtpModal(false);
  };

  /**
   * Handles closing the modal when clicking outside.
   * @param {Event} e - Click event.
   */

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target.id === "otp-modal-overlay") {
      closeModal();
    }
  };


  /**
   * Handles input changes for OTP fields and moves focus accordingly.
   * @param {Event} e - Input event.
   * @param {number} index - Index of the current input field.
   */
  const handleInputChange = (e, index) => {
    const { value } = e.target;

    if (value.length > 1) {
      otpInputRefs.current[index].value = value[value.length - 1];
    }

    if (value && /^[0-9]$/.test(value) && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    setIsOtpComplete(otpValues.length === 6);
  };

   /**
   * Handles backspace key to move focus backward.
   * @param {KeyboardEvent} e - Key down event.
   * @param {number} index - Index of the current input field.
   */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpInputRefs.current[index].value && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      } else {
        otpInputRefs.current[index].value = "";
      }
    }
  };

  /**
   * Handles OTP submission.
   * @param {Event} e - Form submission event.
   */
  const otpSubmitHandler = (e) => {
    e.preventDefault();
    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    const userRegisterData = { ...signupData, otp: otpValues };
    dispatch(verifySignupOTP(userRegisterData, setOtpModal, navigate));
  };

  return (
    <div
      id="otp-modal-overlay"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={handleOverlayClick}
    >
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onSubmit={otpSubmitHandler}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold">Email Verification</h3>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-900"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          A six-digit OTP has been sent to your email. Please enter it below to
          verify your email.
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="w-10 h-10 border rounded-md text-center text-lg focus:ring-2 focus:ring-blue-500"
              maxLength="1"
              ref={(el) => (otpInputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button
          className={`w-full p-2 rounded-md text-white ${
            isOtpComplete
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isOtpComplete}
        >
          {loading ? <ButtonLoading /> : <p>Submit</p>}
        </button>
      </form>
    </div>
  );
}

export default OTPModal;
