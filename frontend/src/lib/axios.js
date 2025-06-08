import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://cosmetics-3o1c.onrender.com/api'
    : 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log('Making request to:', config.url, {
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error responses for debugging
    console.error('Request failed:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Only redirect to login if not already on login page and not checking auth status
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !window.location.pathname.includes('/login') &&
        !error.config.url.includes('/checkauth')) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;