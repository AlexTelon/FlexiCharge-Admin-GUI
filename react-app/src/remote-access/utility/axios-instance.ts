import axios from 'axios';
import { authenticationProvider } from '..';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_FLEXICHARGE_API_URL
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - logging out');
      authenticationProvider.logout();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await authenticationProvider.getToken();

      if (newToken) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } else {
        authenticationProvider.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;