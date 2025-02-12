import { RxCross1, RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import logo from "../../public/logo.svg";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import google from "../../public/imgs/google.svg";
import apple from "../../public/imgs/apple.svg";

import ButtonLoading from "../components/Button/ButtonLoading";
import { loginUser } from "../services/operations/authApi";
import Button from "../components/Button/Button";
import { useForm } from "react-hook-form";
import validator from "validator";

function LoginModal({
  loginModal,
  setLoginModal,
  setResetModal,
  setSignupModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
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

  const loginFormSubmitHandler = async(data) => {
    setLoading(true)
    console.log("data", data)
    await dispatch(loginUser(data));
    setLoading(false)
    reset()
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
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={() => setLoginModal(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center">
          <div className="relative h-12 w-28">
            <img src={logo} className="h-full w-full absolute" alt="logo" />
          </div>
          <RxCross2
            onClick={() => setLoginModal(false)}
            className="text-lg cursor-pointer"
          />
        </div>
        <div className="p-6 flex flex-col w-[80%] mx-auto">
          <h2 className="text-xl font-semibold text-left ">
            <span className="text-blue-600 font-bold">SignIn</span> to{" "}
            <span className="font-extrabold hover:text-blue-600">Abilita</span>
            <span className="text-blue-600 font-extrabold">Edge</span>
          </h2>
          <p className="text-neutral-700 text-xs">
            <span>Don't have an account?</span>{" "}
            <span
              onClick={() => {
                setLoginModal(false);
                setSignupModal(true);
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              SignUp
            </span>
          </p>

          <form
            className="flex flex-col gap-2 mt-4 text-sm"
            onSubmit={handleSubmit(loginFormSubmitHandler)}
          >
            <div>
              <label htmlFor="email" className="text-xs font-semibold">
                Email
              </label>
              <input
                {...register("identifier", {
                  required: "Email is required",
                  validate: (value) =>
                    validator.isEmail(value) || "Invalid email address",
                })}
                id="email"
                type="email"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
              />
              {errors?.identifier && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.identifier?.message}
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
                  {...formValidation}
                  id="password"
                  type={!showPassword?  "password" : "text"}
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

              <button
                className={`py-2 h-8 w-full flex justify-center items-center rounded-md text-white
                     bg-blue-600 hover:bg-blue-700
                     disabled:bg-gray-400 ${loading && "cursor-not-allowed"}
                `}
                disabled={loading}
              >
                {loading ? <ButtonLoading /> : <p>Submit</p>}
              </button>
            
          </form>

          <div className="h-10 w-full flex items-center relative">
            <div className="border-b border-neutral-300 w-full"></div>
            <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">
              or sign in with
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img
                src={apple}
                className="h-[60%] w-[70%] absolute"
                alt="apple-logo"
              />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img
                src={google}
                className="h-[60%] w-[70%] absolute"
                alt="google-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;





// import { RxCross1, RxCross2 } from "react-icons/rx";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import logo from "../../public/logo.svg";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import google from "../../public/imgs/google.svg";
// import apple from "../../public/imgs/apple.svg";

// import ButtonLoading from "../components/Button/ButtonLoading";
// import { loginUser } from "../services/operations/authApi";
// import Button from "../components/Button/Button";

// function LoginModal({
//   loginModal,
//   setLoginModal,
//   setResetModal,
//   setSignupModal,
// }) {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginFormData, setLoginFormData] = useState({
//     identifier: "",
//     password: "",
//   });

//   if (!loginModal) return null;

//   const { identifier, password } = loginFormData;
//   const isFormValid = identifier && password;

//   const loginFormChangeHandler = (e) => {
//     setLoginFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const loginFormSubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(loginFormData));
//     setLoginFormData({ identifier: "", password: "" });
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
//       onClick={() => setLoginModal(false)}
//     >
//       <div
//         className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
//       >
//         <div className="flex justify-between items-center">
//           <div className="relative h-12 w-28">
//             <img src={logo} className="h-full w-full absolute" alt="logo" />
//           </div>
//           <RxCross2
//             onClick={() => setLoginModal(false)}
//             className="text-lg cursor-pointer"
//           />
//         </div>
//         <div className="p-6 flex flex-col w-[80%] mx-auto">
//           <h2 className="text-xl font-semibold text-left ">
//             <span className="text-blue-600 font-bold">SignIn</span> to{" "}
//             <span className="font-extrabold hover:text-blue-600">Abilita</span>
//             <span className="text-blue-600 font-extrabold">Edge</span>
//           </h2>
//           <p className="text-neutral-700 text-xs">
//             <span>Don't have an account?</span>{" "}
//             <span
//               onClick={() => {
//                 setLoginModal(false);
//                 setSignupModal(true);
//               }}
//               className="text-blue-600 cursor-pointer hover:underline"
//             >
//               SignUp
//             </span>
//           </p>

//           <form
//             className="flex flex-col gap-2 mt-4 text-sm"
//             onSubmit={loginFormSubmitHandler}
//           >
//             <div>
//               <label htmlFor="email" className="text-xs font-semibold">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                 maxLength="50"
//                 value={identifier}
//                 name="identifier"
//                 onChange={loginFormChangeHandler}
//               />
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-0.5">
//                 <label htmlFor="password" className="text-xs font-semibold ">
//                   Password
//                 </label>
//               </div>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={!showPassword && "password"}
//                   className="w-full outline-0 border px-2 py-1 rounded focus:border-blue-500"
//                   value={password}
//                   name="password"
//                   onChange={loginFormChangeHandler}
//                 />
//                 <div
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="text-sm absolute right-2 top-1/2 -translate-y-1/2"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//               <p
//                 className="flex justify-end text-xs text-blue-600 cursor-pointer hover:underline text-center"
//                 onClick={() => {
//                   setResetModal(true);
//                   setLoginModal(false);
//                 }}
//               >
//                 Forgot password?
//               </p>
//             </div>

//             <div className="flex items-center justify-between mt-3">
//               <button
//                 className={`px-6 py-2 rounded-md text-white ${
//                   isFormValid
//                     ? "bg-blue-600 hover:bg-blue-700"
//                     : "bg-gray-400 cursor-not-allowed"
//                 }`}
//                 disabled={!isFormValid}
//               >
//                 {loading ? <ButtonLoading /> : <p>Submit</p>}
//               </button>
//             </div>
//           </form>

//           <div className="h-10 w-full flex items-center relative">
//             <div className="border-b border-neutral-300 w-full"></div>
//             <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">
//               or sign in with
//             </span>
//           </div>

//           <div className="flex items-center justify-center gap-3">
//             <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
//               <img
//                 src={apple}
//                 className="h-[60%] w-[70%] absolute"
//                 alt="apple-logo"
//               />
//             </div>
//             <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
//               <img
//                 src={google}
//                 className="h-[60%] w-[70%] absolute"
//                 alt="google-logo"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginModal;
