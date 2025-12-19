
import { APP_CONFIG } from '../constants';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock user database
const MOCK_USER: User = {
  id: '1',
  name: 'Admin',
  email: `admin${APP_CONFIG.EMAIL_DOMAIN}`,
};

// Mock login function
export const login = (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email.toLowerCase() === MOCK_USER.email &&
        credentials.password === 'password123'
      ) {
        resolve(MOCK_USER);
      } else {
        reject(new Error('Email ou senha inválidos.'));
      }
    }, 1000); // Simulate network delay
  });
};

// Mock logout function
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
