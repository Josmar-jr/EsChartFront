import { ReactNode } from 'react';

export type User = {
  email: string;
  permissions: string[];
  roles: string[];
  avatar?: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  confirmTerms: boolean;
};

export type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

export interface AuthProviderProps {
  children: ReactNode;
}
