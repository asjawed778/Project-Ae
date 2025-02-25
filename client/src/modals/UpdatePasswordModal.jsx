import { RxCross2 } from "react-icons/rx";

import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";

import ButtonLoading from "../components/Button/ButtonLoading";
import { useUpdatePasswordMutation } from "../services/auth.api";

// import { updatePassword } from "../services/operations/authApi";

/**
 * UpdatePasswordModal Component
 *
 * This component renders a modal for updating the password using an OTP verification system.
 * Users enter a six-digit OTP sent to their email and then update their password.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.email - The email of the user
 * @param {boolean} props.updatePasswordModal - State to control modal visibility
 * @param {Function} props.setUpdatePasswordModal - Function to toggle modal visibility
 * @param {Function} props.setLoginModal - Function to toggle the login modal
 */
function UpdatePasswordModal({
  email,
  updatePasswordModal,
  setUpdatePasswordModal,
}) {
  const modalRef = useRef(null);
  const otpInputRefs = useRef([]);

  // const dispatch = useDispatch();

  const [updatePassword, { isLoading, error }] = useUpdatePasswordMutation();

  const [isOtpComplete, setIsOtpComplete] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: email,
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { newPassword, confirmNewPassword } = userData;

  useEffect(() => {
    setUserData((prevState) => ({ ...prevState, email: email }));
  }, [email]);

  useEffect(() => {
    if (updatePasswordModal) {
      otpInputRefs.current[0]?.focus();
    }
  }, [updatePasswordModal]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUpdatePasswordModal(false);
      }
    };

    if (updatePasswordModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePasswordModal]);

  if (!updatePasswordModal) return null;

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setUpdatePasswordModal(false);
  };

  /**
   * Handles OTP input changes and auto-focuses next field
   * @param {Object} e - Event object
   * @param {number} index - OTP input index
   */
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) {
      otpInputRefs.current[index].value = value[value.length - 1];
    }

    if (/^[0-9]$/.test(otpInputRefs.current[index].value) && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    setIsOtpComplete(otpValues.length === 6);
  };

  /**
   * Handles backspace key navigation for OTP inputs
   * @param {Object} e - Event object
   * @param {number} index - OTP input index
   */
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otpInputRefs.current[index].value &&
      index > 0
    ) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Handles form input changes
   * @param {Object} e - Event object
   */
  const loginFormChangeHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles OTP submission and dispatches the updatePassword action
   * @param {Object} e - Event object
   */

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
    const userRegisterData = { ...userData, otp: otpValues };

    try {
      await updatePassword(userRegisterData);
      toast.success("Password Updated Successfully");
      setUpdatePasswordModal(false);
    } catch (err) {
      toast.error(error);
    }
  };

  // const otpSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const otpValues = otpInputRefs.current.map((ref) => ref.value).join("");
  //   const userRegisterData = { ...userData, otp: otpValues };
  //   dispatch(
  //     updatePassword(userRegisterData, setUpdatePasswordModal, setLoginModal)
  //   );
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
      <form
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-96 p-6"
        onSubmit={otpSubmitHandler}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Email Verification
          </h3>
          <RxCross2
            className="cursor-pointer text-gray-600"
            onClick={closeModal}
          />
        </div>
        <p className="text-gray-600 text-sm mb-4">
          A six-digit OTP has been sent to your Email. Please enter it below to
          verify your Email.
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="w-10 h-10 border rounded-lg text-center text-lg"
              maxLength="1"
              ref={(el) => (otpInputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <input
          type="password"
          className="w-full p-2 mb-2 border rounded-lg"
          placeholder="New Password"
          value={newPassword}
          name="newPassword"
          onChange={loginFormChangeHandler}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Confirm Password"
          value={confirmNewPassword}
          name="confirmNewPassword"
          onChange={loginFormChangeHandler}
        />

        <button
          className={`w-full p-2 rounded-lg transition ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          // disabled={!isOtpComplete || loading}
          disabled={!isOtpComplete || isLoading}
        >
          {/* {loading ? <ButtonLoading /> : "Submit"} */}
          {isLoading ? <ButtonLoading /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePasswordModal;
