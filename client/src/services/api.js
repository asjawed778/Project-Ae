import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, login } from "../store/reducers/authReducer";

const baseURL = `${import.meta.env.VITE_BE_URL}/api/v1/`;

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});

export const privateBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();

    // Skip setting the accessToken for the /refresh-token endpoint
    const token = state.auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const authBaseQuery = async (args, api, extraOptions) => {
  let result = await privateBaseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  
  return result;





  // import axios from "axios";
  // import Cookies from "js-cookie";
  
  // export const token = Cookies.get("token");
  // export const SERVER_URL = `${import.meta.env.VITE_BE_URL}/api/v1`;
  // export const axiosInstance = axios.create({});
  
  // export const apiConnector = (method, url, bodyData, headers, params) => {
  //   return axiosInstance({
  //     method: `${method}`,
  //     url: `${url}`,
  //     data: bodyData ? bodyData : null,
  //     headers: headers ? headers : null,
  //     params: params ? params : null,
  //   });
  // };
  
};