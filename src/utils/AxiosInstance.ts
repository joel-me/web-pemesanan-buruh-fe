import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <-- hubungkan ke backend NestJS nanti
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
