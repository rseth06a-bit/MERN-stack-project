// frontend/src/api.js
export const API = (import.meta.env.VITE_API_URL || "http://localhost:5555").replace(/\/$/, "");
