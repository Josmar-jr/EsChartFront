import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import Router from 'next/router';

import { setCookie, parseCookies, destroyCookie } from 'nookies';
import toast from 'react-hot-toast';

import { api } from '../../services/apiClient';
import { useTheme } from 'next-themes';

import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  SignUpCredentials,
  User
} from './types';
import { getMe } from '../../services/requests/me';
import { requestAdminCredentials } from '../../services/requests/adminCredentials';

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export const signOut = () => {
  destroyCookie(undefined, 'eschart.token');
  destroyCookie(undefined, 'eschart.refreshToken');

  Router.push('/');
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { theme } = useTheme();

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'eschart.token': token } = parseCookies();

    const getCurrentMe = async () => {
      const { email, name, username, avatar } = await getMe();
      setUser({
        email,
        name,
        username,
        avatar
      });

      return;
    };

    if (token) {
      getCurrentMe();
    }
  }, []);

  const customToast = theme === 'dark' && {
    style: {
      background: '#1e293b',
      color: '#f1f5f9'
    }
  };

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post('/token', {
        email,
        password
      });

      const { access: token, refresh: refreshToken } = data;

      setCookie(undefined, 'eschart.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'eschart.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Login efetuado com sucesso!', customToast);

      const { name, username, avatar } = await getMe();

      setUser({
        email,
        name,
        username,
        avatar
      });

      Router.push('/dashboard');
    } catch {
      toast.error('Email ou senha incorretos!', customToast);
    }
  };

  const signUp = async ({ name, email, password }: SignUpCredentials) => {
    try {
      const { token } = await requestAdminCredentials();

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      console.log(name, email, password);

      await api.post('/extensao_ufrn_api/user', {
        email,
        name,
        password
      });

      toast.success('Usuário criado com sucesso!', customToast);
      Router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Já existe um usuário com esse E-mail!', customToast);
        return;
      }

      toast.error('Error ao criar o usuário!', customToast);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
