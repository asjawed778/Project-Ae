import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendSignupOTP } from "../services/operations/authApi";
import ButtonLoading from "../components/Button/ButtonLoading";
import logo from "../../public/logo.svg";
import google from "../../public/imgs/google.svg";
import apple from "../../public/imgs/apple.svg";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import validator from "validator";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/formValidationSchema";

/**
 * SignupModal Component
 * 
 * This component renders a signup modal that allows users to register an account.
 * It includes form validation, password visibility toggling, and OTP dispatching.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.signupModal - Controls the visibility of the signup modal
 * @param {Function} props.setSignupModal - Function to set the signup modal visibility
 * @param {Function} props.setOtpModal - Function to set the OTP modal visibility
 * @param {Function} props.setSignupData - Function to store signup form data
 * @param {Function} props.setLoginModal - Function to toggle login modal visibility
 */
function SignupModal({
  signupModal,
  setSignupModal,
  setOtpModal,
  setSignupData,
  setLoginModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema)
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!signupModal) return null;

   /**
   * Closes the signup modal.
   */
  const signupModalCloseHandler = () => {
    setSignupModal(false);
  };

   /**
   * Handles overlay click to close the modal.
   * @param {Event} e - Click event
   */
  const overlayClickHandler = (e) => {
    if (e.target.id === "signup-modal-overlay") {
      setSignupModal(false);
    }
  };

  /**
   * Handles the signup form submission.
   * @param {Object} data - Form data containing user credentials
   */
  const signupFormSubmitHandler = async (data) => {
    try {
      setLoading(true);
      setSignupData(data);
      const result = await dispatch(sendSignupOTP(data, setSignupModal, setOtpModal));
      if (result)
      {
        throw new Error(result)
      }
      reset();
    } catch (err) {
      console.log("Sign in error: ", err);
    } finally {
      setLoading(false);
    }
  };
  const formValidation = {
    ...register("password", {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      maxLength: {
        value: 100,
        message: "Password must not exceed 100 characters",
      },
      validate: {
        hasUppercase: (value) =>
          /[A-Z]/.test(value) || "Password must have an uppercase letter",
        hasLowercase: (value) =>
          /[a-z]/.test(value) || "Password must have a lowercase letter",
        noSpaces: (value) =>
          !/\s/.test(value) || "Password must not contain spaces",
      },
    }),
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={overlayClickHandler}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">

        <div className="relative h-12 w-28">
          <img src={logo} className="h-full w-full absolute" alt="logo" />
        </div>
        <RxCross2 onClick={signupModalCloseHandler}  className="text-lg cursor-pointer"/>
        </div>
        <div className="p-5 flex flex-col w-[80%] mx-auto">
          <p className="text-neutral-700 text-xs font-semibold">
            Start your journey
          </p>
          <h2 className="text-xl font-semibold text-left ">
            <span className="text-blue-600 font-bold">SignUp</span> to{" "}
            <span className="font-extrabold hover:text-blue-600">Abilita</span>
            <span className="text-blue-600 font-extrabold">Edge</span>
          </h2>
          <form
            className="flex flex-col gap-2 mt-4 text-sm"
            onSubmit={handleSubmit(signupFormSubmitHandler)}
          >
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="name" className="text-xs font-semibold">
                  Name
                </label>
              </div>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
              />
              {errors?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold mb-0.5">
                Email
              </label>
              <input
                {...register("email", {
                  validate: (value) =>
                    validator.isEmail(value) || "Invalid email address",
                })}
                id="email"
                type="email"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="password" className="text-xs font-semibold ">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold mb-0.5"
              >
                Confirm Password
              </label>
              <div className="relative">
              <input
                {...register("confirmPassword")}
                type={!showConfirmPassword ? "password" : "text"}
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-sm absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </div>
                </div>
              {errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-2 h-8 w-full bg-blue-600 text-xs text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 ${loading && "cursor-not-allowed"} cursor-pointer`}
              >
                {loading ? <><ButtonLoading /> </> : "Register"}
              </button>
            </div>
          </form>

          <div className="h-10 w-full flex items-center relative">
            <div className="border-b border-neutral-300 w-full"></div>
            <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">
              or sign up with
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg cursor-pointer">
              <img
                src={apple}
                className="h-[60%] w-[70%] absolute"
                alt="apple-logo"
              />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg cursor-pointer">
              <img
                src={google}
                className="h-[60%] w-[70%] absolute"
                alt="google-logo"
              />
            </div>
          </div>

          <div className="text-xs mt-4">
            <span>Already have an account?</span>{" "}
            <span
              onClick={() => {
                setSignupModal(false);
                setLoginModal(true);
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;