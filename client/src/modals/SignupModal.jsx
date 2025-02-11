import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendSignupOTP } from "../services/operations/authApi";
import ButtonLoading from "../components/Button/ButtonLoading";
import logo from "../../public/logo.svg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import google from "../../public/imgs/google.svg"
import apple from "../../public/imgs/apple.svg"
import Button from "../components/Button/Button";
import { useForm } from "react-hook-form";
import validator from 'validator';
import SubmitLoader from "./SubmitLoader";

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
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!signupModal) return null;


  const signupModalCloseHandler = () => {
    setSignupModal(false);
  };

  const overlayClickHandler = (e) => {
    if (e.target.id === "signup-modal-overlay") {
      setSignupModal(false);
    }
  };

  const signupFormSubmitHandler = async(data) => {
    try{
      setLoading(true)
      setSignupData(data);
      await dispatch(sendSignupOTP(data, setSignupModal, setOtpModal));
    }
    catch(err)
    {
      console.log("Sign in error: ",err)
    }
    finally{
      reset()
      setLoading(false)
    }
  };
  const formValidation = {...register("password", {
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
        /[A-Z]/.test(value) ||
        "Password must have an uppercase letter",
      hasLowercase: (value) =>
        /[a-z]/.test(value) ||
        "Password must have a lowercase letter",
      noSpaces: (value) =>
        !/\s/.test(value) || "Password must not contain spaces",
    },
  })}

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={overlayClickHandler}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-12 w-28">
          <img src={logo} className="h-full w-full absolute" alt="logo" />
        </div>
        <div className="p-5 flex flex-col w-[80%] mx-auto">
          <p className="text-neutral-700 text-xs font-semibold">
            Start your journey
          </p>
          <h2 className="text-xl font-semibold text-left ">
            <span className="text-blue-600 font-bold">SignUp</span> to <span className="font-extrabold hover:text-blue-600">Abilita</span><span className="text-blue-600 font-extrabold">Edge</span>
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
                <div className="text-[9px] text-gray-400 mt-0">
                  {watch("name")?.length} / 50
                </div>
              </div>
              <input
                {...register("name", { required: "name is required", maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters",
                },})}
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
                {...register("email", { required: "Email is required",
                validate: (value) => validator.isEmail(value) || "Invalid email address", })}
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
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm mr-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <input
                {...formValidation}
                id="password"
                type={!showPassword && "password"}
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
              />
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold mb-0.5">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type={!showPassword && "password"}
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
              />
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
                className="px-6 py-2 bg-blue-600 text-xs text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? <SubmitLoader /> : "Register"}
              </button>

              <Button variant="red" onClick={signupModalCloseHandler}>Close</Button>
            </div>
          </form>

          <div className="h-10 w-full flex items-center relative">
              <div className="border-b border-neutral-300 w-full"></div>
              <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">or sign up with</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img src={apple} className="h-[60%] w-[70%] absolute" alt="apple-logo" />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img src={google} className="h-[60%] w-[70%] absolute" alt="google-logo" />
            </div>
          </div>

          <div className="text-xs mt-4">
            <span>Already have an account?</span>{" "}
            <span onClick={() => {setSignupModal(false) ;setLoginModal(true)}} className="text-blue-600 cursor-pointer hover:underline">Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;







// import { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useDispatch } from "react-redux";
// import { sendSignupOTP } from "../services/operations/authApi";
// import ButtonLoading from "../components/Button/ButtonLoading";
// import logo from "../../public/logo.svg";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import google from "../../public/imgs/google.svg"
// import apple from "../../public/imgs/apple.svg"
// import Button from "../components/Button/Button";

// function SignupModal({
//   signupModal,
//   setSignupModal,
//   setOtpModal,
//   setSignupData,
//   setLoginModal,
// }) {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [signupFormData, setSignupFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   if (!signupModal) return null;

//   const signupModalCloseHandler = () => {
//     setSignupModal(false);
//   };

//   const overlayClickHandler = (e) => {
//     if (e.target.id === "signup-modal-overlay") {
//       setSignupModal(false);
//     }
//   };

//   const { name, email, password, confirmPassword } = signupFormData;
//   const isFormValid =
//     name &&
//     email &&
//     password &&
//     confirmPassword &&
//     password === confirmPassword;

//   const signupFormChangeHandler = (e) => {
//     setSignupFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const signupFormSubmitHandler = (e) => {
//     e.preventDefault();
//     setSignupData(signupFormData);
//     dispatch(sendSignupOTP(signupFormData, setSignupModal, setOtpModal));
//     setSignupFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <div
//       className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
//       onClick={overlayClickHandler}
//     >
//       <div
//         className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="relative h-12 w-28">
//           <img src={logo} className="h-full w-full absolute" alt="logo" />
//         </div>
//         <div className="p-6 flex flex-col w-[80%] mx-auto">
//           <p className="text-neutral-700 text-xs font-semibold">
//             Start your journey
//           </p>
//           <h2 className="text-xl font-semibold text-left ">
//             <span className="text-blue-600 font-bold">SignUp</span> to <span className="font-extrabold hover:text-blue-600">Abilita</span><span className="text-blue-600 font-extrabold">Edge</span>
//           </h2>
//           <form
//             className="flex flex-col gap-2 mt-4 text-sm"
//             onSubmit={signupFormSubmitHandler}
//           >
//             <div>
//               <div className="flex items-center justify-between mb-0.5">
//                 <label htmlFor="name" className="text-xs font-semibold">
//                   Name
//                 </label>
//                 <div className="text-[9px] text-gray-400 mt-0">
//                   {name.length} / 50
//                 </div>
//               </div>
//               <input
//                 id="name"
//                 type="text"
//                 className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                 maxLength="50"
//                 value={name}
//                 name="name"
//                 onChange={signupFormChangeHandler}
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="text-xs font-semibold mb-0.5">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                 value={email}
//                 name="email"
//                 onChange={signupFormChangeHandler}
//               />
//             </div>
//             <div>
//               <div className="flex items-center justify-between mb-0.5">
//                 <label htmlFor="password" className="text-xs font-semibold ">
//                   Password
//                 </label>
//                 <div
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="text-sm mr-1"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//               <input
//                 id="password"
//                 type={!showPassword && "password"}
//                 className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                 value={password}
//                 name="password"
//                 onChange={signupFormChangeHandler}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="text-xs font-semibold mb-0.5">
//                 Confirm Password
//               </label>
//               <input
//                 type={!showPassword && "password"}
//                 className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                 value={confirmPassword}
//                 name="confirmPassword"
//                 onChange={signupFormChangeHandler}
//               />
//             </div>
//             <div className="flex items-center justify-between mt-3">
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-xs text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//                 disabled={!isFormValid || loading}
//               >
//                 {loading ? <ButtonLoading /> : "Register"}
//               </button>

//               <Button variant="red" onClick={signupModalCloseHandler}>Close</Button>
//             </div>
//           </form>

//           <div className="h-10 w-full flex items-center relative">
//               <div className="border-b border-neutral-300 w-full"></div>
//               <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">or sign up with</span>
//           </div>

//           <div className="flex items-center justify-center gap-3">
//             <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
//               <img src={apple} className="h-[60%] w-[70%] absolute" alt="apple-logo" />
//             </div>
//             <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
//               <img src={google} className="h-[60%] w-[70%] absolute" alt="google-logo" />
//             </div>
//           </div>

//           <div className="text-xs mt-4">
//             <span>Already have an account?</span>{" "}
//             <span onClick={() => {setSignupModal(false) ;setLoginModal(true)}} className="text-blue-600 cursor-pointer hover:underline">Sign in</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupModal;
