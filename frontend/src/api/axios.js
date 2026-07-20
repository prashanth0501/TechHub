import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Flask backend URL
  withCredentials: true, // Send session cookies with requests
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, could dispatch logout event or redirect to login
      console.warn("Unauthorized API call", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
