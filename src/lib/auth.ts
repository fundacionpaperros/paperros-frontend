import api, { auth } from './api';

export { auth };

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  nombre: string;
  password: string;
  cedula: string;
  telefono: string;
  direccion: string;
  ciudad: string;
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: 'admin' | 'albergue' | 'adoptante' | 'fundacion';
  activo: boolean;
  email_verificado: boolean;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    
    const response = await api.post<TokenResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    if (response.data.access_token) {
      auth.setToken(response.data.access_token);
    }
    
    return response.data;
  },

  loginJson: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login-json', credentials);
    
    if (response.data.access_token) {
      auth.setToken(response.data.access_token);
    }
    
    return response.data;
  },

  register: async (data: RegisterData): Promise<{ user: User; bandera?: string }> => {
    // Create adopter profile (this also creates the user)
    const response = await api.post('/adopters/register', {
      email: data.email,
      nombre: data.nombre,
      password: data.password,
      cedula: data.cedula,
      telefono: data.telefono,
      direccion: data.direccion,
      ciudad: data.ciudad,
    });

    // Login after registration
    await authService.login({
      email: data.email,
      password: data.password,
    });

    // Get user info
    const user = await authService.getCurrentUser();

    return {
      user,
      bandera: response.data.bandera,
    };
  },

  logout: () => {
    auth.removeToken();
    if (typeof window !== 'undefined') {
      // Redirect to home, the app will handle routing based on context
      window.location.href = '/';
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token });
  },

  resendVerification: async (): Promise<void> => {
    await api.post('/auth/resend-verification');
  },

  getAdoptionProgress: async (): Promise<{ proceso_paso: number | null; bandera: string }> => {
    const response = await api.get('/adoption-process/progress');
    return response.data;
  },
};

