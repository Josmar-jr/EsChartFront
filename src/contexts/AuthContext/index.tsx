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

    if (token) {
      api
        .get('/extensao_ufrn_api/user/3')
        .then(response => {
          const {
            email,
            name,
            username,
            avatar,
            user_permissions: permissions
          } = response.data;

          setUser({ email, name, permissions, avatar, username });
          console.log(user)
        })
        .catch(error => {
          console.error(`Router '/me' with error ${error}`);
          signOut();
          // authChannel.close();
        });
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

      setUser({
        email
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Login efetuado com sucesso!', customToast);
      Router.push('/dashboard');
    } catch {
      toast.error('Email ou senha incorretos!', customToast);
    }
  };

  const signUp = async ({
    name,
    email,
    password,
    confirmPassword,
    confirmTerms
  }: SignUpCredentials) => {
    console.log(
      'Sign Up',
      name,
      email,
      password,
      confirmPassword,
      confirmTerms
    );
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
