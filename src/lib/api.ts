// src/lib/api.ts
import axios from 'axios';

const rawBaseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const normalizedBaseURL = rawBaseURL.replace(/\/+$/, '');

const api = axios.create({
  baseURL: normalizedBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token (uniquement côté client)
api.interceptors.request.use((config) => {
  // Vérification importante : on est bien dans le navigateur
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (config.url?.startsWith('/api') && normalizedBaseURL.endsWith('/api')) {
    config.url = config.url.replace(/^\/api/, '');
  }

  return config;
});

export default api;