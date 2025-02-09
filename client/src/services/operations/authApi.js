import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import { userAuthEndpoints } from "../user.api";
import { apiConnector } from "../api";
import { login, logout } from "../../store/reducers/authReducer";

// Endpoints for user Auth methods
const {
  SEND_SIGNUP_OTP_API,
  VERIFY_SIGNUP_OTP_API,
  LOGIN_API,
  LOGOUT_API,
  UPDATE_PASSWORD_API,
  SEND_FORGOT_PASSWORD_OTP_API,
  VERIFY_FORGOT_PASSWORD_OTP_API,
} = userAuthEndpoints;

export function sendSignupOTP(signupFormData, setSignupModal, setOtpModal) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        SEND_SIGNUP_OTP_API,
        signupFormData
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      setSignupModal(false);
      setOtpModal(true);
    } catch (error) {
      if (error.status === 409) {
        toast.error("User Already Registered, Please login");
      }
      if (error.status === 400) {
        toast.error("Please Enter all details");
      }
      if (error.status === 500) {
        toast.error("Internal Server Error");
      }
      console.log("Error in Sending OTP........", error);
    }
  };
}

export function verifySignupOTP(userRegisterData, setOtpModal, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        VERIFY_SIGNUP_OTP_API,
        userRegisterData
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(login(response.data));
      // console.log(response.data);

      toast.success("User Registerd successfully");
      setOtpModal(false);
      navigate("/");
    } catch (error) {
      console.log("Error in user register: ", error);
      if (error.status === 409) {
        toast.error("User Already Registered, Please login");
      }
      if (error.status === 400) {
        toast.error("Please Enter all details");
      }
      if (error.status === 500) {
        toast.error("Internal Server Error");
      }
    }
  };
}

export function logoutUser(navigate) {
  return async (dispatch) => {
    const load = toast.loading("Please Wait");
    try {
      const response = await apiConnector("POST", LOGOUT_API);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      // console.log("Error in logging out: ", error);
      toast.error("Error", error);
      return;
    } finally {
      toast.dismiss(load);
    }
  };
}

export function loginUser(userLoginData, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, userLoginData);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const token = response.data.token;
      const user = response.data.user;

      dispatch(login({ token, user }));
      console.log("loginUser", response);

      console.log("token", response.data);

      Cookies.set("token", token, { expires: 7 }); // Token valid for 7 days

      toast.success("User Login successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in user login: ", error);

      if (error.status === 400) {
        toast.error("Please Enter all details");
      }
      if (error.status === 500) {
        toast.error("Internal Server Error");
      }
    }
  };
} 

export function resetPassword(
  userEmail,
  setResetModal,
  setUpdatePasswordModal
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        SEND_FORGOT_PASSWORD_OTP_API,
        userEmail
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");

      // to close reset modal
      setResetModal(false);

      // to invoke otp modal
      setUpdatePasswordModal(true);
    } catch (error) {
      if (error.status === 500) {
        toast.error("Internal Server Error");
      }

      console.log("Error in Sending OTP......", error);
    }
  };
}

export function updatePassword(
  userRegisterData,
  setUpdatePassswordModal,
  setLoginModal
) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        VERIFY_FORGOT_PASSWORD_OTP_API,
        userRegisterData
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Updated Successfully");

      setUpdatePassswordModal(false);
    } catch (error) {
      if (error.status === 400) {
        toast.error("Please Enter all details");
      }

      if (error.status === 500) {
        toast.error(" Internal Server Error ");
      }
    }
  };
}
