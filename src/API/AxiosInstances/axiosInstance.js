import axios from 'axios';

console.log('process.env.NODE_ENV',process.env.NODE_ENV)

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://workout-app-backend-a67feb525b8a.herokuapp.com' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
