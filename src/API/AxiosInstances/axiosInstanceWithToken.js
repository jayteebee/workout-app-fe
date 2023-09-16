import axios from 'axios';
import { logOut } from '../Authentication/Authentication';


const axiosInstanceWithToken = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
                ? 'https://workout-app-web-service.onrender.com'//'https://workout-app-backend-a67feb525b8a.herokuapp.com' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstanceWithToken.interceptors.request.use(function(config) {
    const token = window.localStorage.getItem("token");
    config.headers.Authorization =  token ? `${token}` : '';
    return config;
});

axiosInstanceWithToken.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid
        await logOut(); // Perform logout action
        window.location.href = '/GettingStarted'; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

export default axiosInstanceWithToken;

