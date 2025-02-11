import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import logo from "../../public/logo.svg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import google from "../../public/imgs/google.svg"
import apple from "../../public/imgs/apple.svg"

import ButtonLoading from "../components/Button/ButtonLoading";
import { loginUser } from "../services/operations/authApi";
import Button from "../components/Button/Button";

function LoginModal({
  loginModal,
  setLoginModal,
  setResetModal,
  setSignupModal,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setLoginModal(false)}
        >
          <RxCross1 size={20} />
        </button> */}
        <div className="relative h-12 w-28">
          <img src={logo} className="h-full w-full absolute" alt="logo" />
        </div>
        <div className="p-6 flex flex-col w-[80%] mx-auto">
          <h2 className="text-xl font-semibold text-left ">
            <span className="text-blue-600 font-bold">SignIn</span> to{" "}
            <span className="font-extrabold hover:text-blue-600">Abilita</span>
            <span className="text-blue-600 font-extrabold">Edge</span>
          </h2>
          <p className="text-neutral-700 text-xs">
            <span>Don't have an account?</span>{" "}
            <span onClick={() => {setLoginModal(false); setSignupModal(true)}} className="text-blue-600 cursor-pointer hover:underline">SignUp</span>
            
          </p>

          <form className="flex flex-col gap-2 mt-4 text-sm" onSubmit={loginFormSubmitHandler}>
            <div>
              <label htmlFor="email" className="text-xs font-semibold">
                  Email
                </label>
              <input
                id="email"
                type="email"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
                maxLength="50"
                value={identifier}
                name="identifier"
                onChange={loginFormChangeHandler}
              />
            </div>

            <div>
            <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="password" className="text-xs font-semibold ">
                  Password
                </label>
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm mr-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <input
                id="password"
                type={!showPassword && "password"}
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
                value={password}
                name="password"
                onChange={loginFormChangeHandler}
              />
            <p
              className="flex justify-end text-xs text-blue-600 cursor-pointer hover:underline text-center"
              onClick={() => {
                setResetModal(true);
                setLoginModal(false);
              }}
            >
              Forgot password?
            </p>
            </div>

            <div className="flex items-center justify-between mt-3">
            <button
              className={`px-6 py-2 rounded-md text-white ${
                isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
              >
              {loading ? <ButtonLoading /> : <p>Submit</p>}
            </button>
            <Button variant="red" onClick={() => setLoginModal(false)}>Close</Button>
              </div>
          </form>

          <div className="h-10 w-full flex items-center relative">
              <div className="border-b border-neutral-300 w-full"></div>
              <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">or sign in with</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img src={apple} className="h-[60%] w-[70%] absolute" alt="apple-logo" />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img src={google} className="h-[60%] w-[70%] absolute" alt="google-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
