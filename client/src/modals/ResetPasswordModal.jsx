import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";

import ButtonLoading from "../components/Button/ButtonLoading";
import { useSendForgotPasswordOtpMutation } from "../services/auth.api";

function ResetPasswordModal({
  setEmail,
  resetModal,
  setResetModal,
  setUpdatePasswordModal,
}) {
  const [sendForgotPasswordOtp, { isLoading }] =
    useSendForgotPasswordOtpMutation();
  const [userEmail, setUserEmail] = useState({ email: "" });

  const isFormValid = userEmail.email.trim() !== "";

  if (!resetModal) return null;

  const resetPasswordChangeHandler = (e) => {
    setUserEmail({ email: e.target.value });
  };

  const resetPasswordSubmitHandler = async (e) => {
    e.preventDefault();

    const { email } = userEmail;
    setEmail(email);

    await sendForgotPasswordOtp(userEmail);

    toast.success("OTP sent successfully");

    // to close reset modal
    setResetModal(false);

    // to invoke otp modal
    setUpdatePasswordModal(true);

    setUserEmail({ email: "" });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={() => setResetModal(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setResetModal(false)}
        >
          <RxCross1 size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        <form className="space-y-4" onSubmit={resetPasswordSubmitHandler}>
          <div>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              maxLength="50"
              value={userEmail.email}
              name="email"
              onChange={resetPasswordChangeHandler}
            />
          </div>

          <button
            className={`w-full p-2 rounded-md text-white ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {isLoading ? <ButtonLoading /> : <p>Submit</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal;
