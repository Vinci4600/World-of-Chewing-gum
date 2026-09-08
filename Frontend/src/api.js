import axios from "axios";

const API = axios.create({
    baseURL: "/",
});

// Fügt automatisch das Bearer-Token bei jeder Anfrage hinzu
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;