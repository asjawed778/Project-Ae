
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// USER AUTH ENDPOINTS
export const endpoints = {
    SEND_SIGNUP_OTP_API: SERVER_URL + "/send-signup-otp",
    VERIFY_SIGNUP_OTP_API: SERVER_URL + "/verify-signup-otp",
    LOGIN_API: SERVER_URL + "/login",
    LOGOUT_API: SERVER_URL + "/logout",
    UPDATE_PASSWORD_API: SERVER_URL + "/update-password",
    SEND_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/send-forgotPassword-otp",
    VERIFY_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/verify-forgotPassword-otp"
}