import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';

import toast from 'react-hot-toast';
import { api } from '../services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

export type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'eschart.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { email, roles, permissions } = response.data;

        setUser({ email, roles, permissions });
      });
    }
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password
      });

      const { roles, permissions, token, refreshToken } = data;

      setCookie(undefined, 'eschart.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'eschart.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        email,
        permissions,
        roles
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Login efetuado com sucesso!');
      // Router.push('/dashboard');
    } catch {
      toast.error('Email ou senha incorreto!', {
        style: {
          fontSize: '1rem'
        }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
