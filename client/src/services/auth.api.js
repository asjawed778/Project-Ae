import { createApi } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./api";

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: publicBaseQuery,
  endpoints: (builder) => ({
    // Auth APIs
    sendSignupOtp: builder.mutation({
      query: (data) => ({
        url: "send-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifySignupOtp: builder.mutation({
      query: (data) => ({
        url: "verify-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "update-password",
        method: "POST",
        body: data,
      }),
    }),
    sendForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "send-forgotPassword-otp",
        method: "POST",
        body: data,
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
  useUpdatePasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useSendForgotPasswordOtpMutation,
  useLoginMutation,
  useSendSignupOtpMutation,
} = apiAuth;
