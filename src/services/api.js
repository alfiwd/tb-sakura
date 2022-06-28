import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 120000,
//   headers: {
//     Accept: "application/json",
//   },
// });

const apiServices = {
  get: (url) => {
    const token = localStorage.getItem("accessToken");
    const config = {
      baseURL: BASE_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios
      .get(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  post: (url, data, config = {}) => {
    const token = localStorage.getItem("accessToken");
    return axios
      .post(url, data, {
        baseURL: BASE_URL,
        headers: {
          Authorization: "Bearer " + token,
          ...config,
        },
      })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  put: (url, data, config = {}) => {
    const token = localStorage.getItem("accessToken");
    return axios
      .put(url, data, {
        baseURL: BASE_URL,
        headers: {
          Authorization: "Bearer " + token,
          ...config,
        },
      })
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete: (url) => {
    const token = localStorage.getItem("accessToken");
    const config = {
      baseURL: BASE_URL,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return axios
      .delete(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};

export default apiServices;
