import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://workout-app-backend-a67feb525b8a.herokuapp.com' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
