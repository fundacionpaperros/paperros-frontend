import axios, { AxiosError } from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://18.116.45.107:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth helpers
export const auth = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
  isAuthenticated: (): boolean => {
    return auth.getToken() !== null;
  },
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle unauthorized/forbidden access - token expired or invalid
      // Limpiar el token, pero dejar que los componentes manejen el redirect
      // para evitar loops de redirect y dar mejor control
      auth.removeToken();
    }
    return Promise.reject(error);
  }
);

// Helper function to check if API is available
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    // Health endpoint is at root, not under /api
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://18.116.45.107:8000/api';
    const healthURL = baseURL.replace('/api', '') + '/health';
    const response = await axios.get(healthURL, { timeout: 3000 });
    return response.status === 200;
  } catch {
    return false;
  }
};

// Helper function to safely fetch with fallback
export const safeFetch = async <T>(
  apiCall: () => Promise<T>,
  fallback: T,
  silent: boolean = false
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    if (!silent) {
      console.warn('API call failed, using fallback data:', error);
    }
    return fallback;
  }
};

export default api;
