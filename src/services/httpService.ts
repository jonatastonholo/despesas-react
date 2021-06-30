import axios from 'axios';

const BASE_URL: string = process.env.REACT_APP_BACKEND_URL!;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:1000
})