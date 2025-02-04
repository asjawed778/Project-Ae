import axios from "axios";
import Cookies from "js-cookie";

export const token = Cookies.get("token");
export const SERVER_URL = import.meta.env.VITE_BE_URL;
export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
