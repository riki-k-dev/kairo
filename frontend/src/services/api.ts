// frontend/src/services/api.ts

import axios from "axios";

const api = axios.create({
  // dev environment ke liye hardcode kar raha hu, baad mein .env use karunga
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const tokenStr = localStorage.getItem("kairo_token");

    if (tokenStr && config.headers) {
      config.headers.Authorization = `Bearer ${tokenStr}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("kairo_token");

      if (
        window.location.pathname !== "/signin" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
