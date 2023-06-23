import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
                ? 'https://placeholder.com' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
