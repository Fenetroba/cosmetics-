import axios from "axios";
import { toast } from "sonner";

// Determine the base URL based on the environment
const baseURL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api" 
  : "https://cosmetics-3o1c.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
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
    // Log detailed error information
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      cookies: document.cookie,
      headers: error.response?.headers,
      data: error.response?.data
    });

    // Handle CORS errors specifically
    if (error.message === 'Network Error' && !error.response) {
      console.error('CORS Error: Request blocked by CORS policy');
      toast.error('Network Error', {
        description: 'Unable to connect to the server. Please check your internet connection.',
        duration: 3000,
      });
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/auth/login')) {
        toast.error('Session Expired', {
          description: 'Please login again to continue.',
          duration: 3000,
        });
        window.location.href = '/auth/login';
      }
    }

    // Handle forbidden errors
    if (error.response?.status === 403) {
      toast.error('Access Denied', {
        description: error.response.data?.message || 'You do not have permission to access this resource.',
        duration: 3000,
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;