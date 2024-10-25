import axios from "axios";

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

// import axios from "axios";

// // Create an axios instance
// export const axiosInstance = axios.create({});

// // API Connector function
// export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
//   return axiosInstance({
//     method: method,
//     url: url,
//     data: bodyData,
//     headers: headers,
//     params: params,
//   });
// };
