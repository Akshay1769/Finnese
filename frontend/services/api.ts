import axios from "axios";

const LOCAL_URL ="http://localhost:5000/api/v1";
const PROD_URL ="https://finnese.onrender.com/api/v1";

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ?LOCAL_URL 
    :PROD_URL

  // baseURL: "http://localhost:5000/api/v1",
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