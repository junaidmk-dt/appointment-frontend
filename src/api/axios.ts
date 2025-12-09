import axios from "axios";

// Create Axios instance
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
const api = axios.create({ baseURL });

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Ensure headers exist
  if (token) {
    config.headers = config.headers ?? {}; 
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
