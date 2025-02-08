import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useState } from "react";

import ButtonLoading from "../components/Button/ButtonLoading";
import { loginUser } from "../services/operations/authApi";

function LoginModal({ loginModal, setLoginModal, setResetModal }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    identifier: "",
    password: "",
  });

  if (!loginModal) return null;

  const { identifier, password } = loginFormData;
  const isFormValid = identifier && password;

  const loginFormChangeHandler = (e) => {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginFormData));
    setLoginFormData({ identifier: "", password: "" });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={() => setLoginModal(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setLoginModal(false)}
        >
          <RxCross1 size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form className="space-y-4" onSubmit={loginFormSubmitHandler}>
          <div>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              maxLength="50"
              value={identifier}
              name="identifier"
              onChange={loginFormChangeHandler}
            />
          </div>

          <div>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              name="password"
              onChange={loginFormChangeHandler}
            />
          </div>

          <p
            className="text-sm text-blue-600 cursor-pointer hover:underline text-center"
            onClick={() => {
              setResetModal(true);
              setLoginModal(false);
            }}
          >
            Forgot password?
          </p>

          <button
            className={`w-full p-2 rounded-md text-white ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {loading ? <ButtonLoading /> : <p>Submit</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
