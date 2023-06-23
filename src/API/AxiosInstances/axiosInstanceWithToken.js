import axios from 'axios';


const axiosInstanceWithToken = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
                ? 'https://placeholder.com/' 
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


export default axiosInstanceWithToken;

