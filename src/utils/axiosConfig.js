import axios from 'axios';
import { auth } from '../services/firebase';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
    if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;