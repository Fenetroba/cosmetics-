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

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can add any request modifications here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      console.log('Unauthorized request');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;