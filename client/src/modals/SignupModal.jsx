import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { sendSignupOTP } from "../services/operations/authApi";
import ButtonLoading from "../components/Button/ButtonLoading";

function SignupModal({
  signupModal,
  setSignupModal,
  setOtpModal,
  setSignupData,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!signupModal) return null;

  const signupModalCloseHandler = () => {
    setSignupModal(false);
  };

  const overlayClickHandler = (e) => {
    if (e.target.id === "signup-modal-overlay") {
      setSignupModal(false);
    }
  };

  const { name, email, password, confirmPassword } = signupFormData;
  const isFormValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

  const signupFormChangeHandler = (e) => {
    setSignupFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();
    setSignupData(signupFormData);
    dispatch(sendSignupOTP(signupFormData, setSignupModal, setOtpModal));
    setSignupFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={overlayClickHandler}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 relative w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={signupModalCloseHandler}
        >
          <RxCross1 size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">
          Create your account
        </h2>
        <form className="space-y-4" onSubmit={signupFormSubmitHandler}>
          <div>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Name"
              maxLength="50"
              value={name}
              name="name"
              onChange={signupFormChangeHandler}
            />
            <span className="text-sm text-gray-500">{name.length} / 50</span>
          </div>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Email"
            value={email}
            name="email"
            onChange={signupFormChangeHandler}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter Password"
            value={password}
            name="password"
            onChange={signupFormChangeHandler}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={signupFormChangeHandler}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!isFormValid || loading}
          >
            {loading ? <ButtonLoading /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
