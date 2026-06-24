import axios from "axios";

export const api = axios.create({

  baseURL: "https://api.finnese.work.gd/api/v1",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `user ${token}`;
    }
  }

  return config;
});

