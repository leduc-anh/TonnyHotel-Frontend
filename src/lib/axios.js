
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const instance = axios.create({
    baseURL: API_URL,
});

export default instance;
