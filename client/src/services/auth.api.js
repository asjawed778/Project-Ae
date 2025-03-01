import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./api";

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: publicBaseQuery,
  endpoints: (builder) => ({
    // Auth APIs
    sendSignupOtp: builder.mutation({
      query: (data) => ({
        url: "user/send-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifySignupOtp: builder.mutation({
      query: (data) => ({
        url: "user/verify-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: ({accessToken}) => ({
        url: "user/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Send token in Authorization header
        },
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({data, token}) => ({
        url: `user/reset-password/${token}`,
        method: "POST",
        body: data,
        credentials: 'include'
      }),
    }),
    sendForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "user/send-password-reset-link",
        method: "POST",
        body: data,
        credentials: "include"
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "verify-forgotPassword-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  // Auth
  useLogoutMutation,
  useVerifySignupOtpMutation,
  useResetPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useSendForgotPasswordOtpMutation,
  useLoginMutation,
  useSendSignupOtpMutation,
} = apiAuth;

// import { SERVER_URL } from "./api";

// // USER AUTH ENDPOINTS
// export const userAuthEndpoints = {
//   SEND_SIGNUP_OTP_API: SERVER_URL + "/send-signup-otp",
//   VERIFY_SIGNUP_OTP_API: SERVER_URL + "/verify-signup-otp",
//   LOGIN_API: SERVER_URL + "/login",
//   LOGOUT_API: SERVER_URL + "/logout",
//   UPDATE_PASSWORD_API: SERVER_URL + "/update-password",
//   SEND_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/send-forgotPassword-otp",
//   VERIFY_FORGOT_PASSWORD_OTP_API: SERVER_URL + "/verify-forgotPassword-otp",
// };
