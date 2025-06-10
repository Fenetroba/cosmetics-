import axios from "axios";

// Determine the base URL based on the environment
const baseURL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : "https://cosmetics-3o1c.onrender.com/api";  // Add /api to the base URL

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Allow sending cookies with requests
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Optional: Add interceptors for request/response handling
axiosInstance.interceptors.request.use(config => {
  // You can modify the request config here if needed
  return config;
}, error => {
  // Handle request error here
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  // You can modify the response data here if needed
  return response;
}, error => {
  // Handle response error here
  if (error.response?.status === 401) {
    // Handle unauthorized errors
    console.log('Unauthorized request');
  }
  return Promise.reject(error);
});

export default axiosInstance;