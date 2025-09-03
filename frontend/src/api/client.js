import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize token shape (token | access_token) from responses
export function extractToken(data) {
  return data?.token || data?.access_token;
}

export default api;
