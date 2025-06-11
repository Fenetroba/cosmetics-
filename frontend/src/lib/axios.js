import axios from "axios";

// Determine the base URL based on the environment
const baseURL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : "https://cosmetics-3o1c.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // This is crucial for cookies
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Log request details in development
    if (import.meta.env.MODE === 'development') {
      console.log('Making request to:', config.url, {
        method: config.method,
        withCredentials: config.withCredentials,
        headers: config.headers
      });
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Log response details in development
    if (import.meta.env.MODE === 'development') {
      console.log('Received response from:', response.config.url, {
        status: response.status,
        headers: response.headers,
        cookies: document.cookie
      });
    }
    return response;
  },
  error => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      cookies: document.cookie
    });

    if (error.response?.status === 401) {
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;