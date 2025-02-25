import { SERVER_URL } from "./api";

// USER AUTH ENDPOINTS
export const userAuthEndpoints = {
  SEND_SIGNUP_OTP_API: SERVER_URL + "/send-signup-otp",
  VERIFY_SIGNUP_OTP_API: SERVER_URL + "/verify-signup-otp",
  LOGIN_API: SERVER_URL + "/login",
  LOGOUT_API: SERVER_URL + "/logout",
  UPDATE_PASSWORD_API: SERVER_URL + "/update-password",
  SEND_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/send-forgotPassword-otp",
  VERIFY_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/verify-forgotPassword-otp",
};
