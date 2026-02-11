import { LOGIN } from "@/app/constants/frontendRoute";
import { TOKEN_KEY } from "@/app/constants/auth";
import axios from "axios"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: false
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status == 401) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = LOGIN; // API interceptor is not a react function, cannot use react hooks
            return console.error('Unauthorized access');
        }

        return Promise.reject(error)
    }
)