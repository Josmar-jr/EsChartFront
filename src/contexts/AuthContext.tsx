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

import { api } from '../services/apiClient';
import { useTheme } from 'next-themes';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
  avatar?: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'eschart.token');
  destroyCookie(undefined, 'eschart.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { theme } = useTheme();

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    let emit = false;
    authChannel = new BroadcastChannel('auth');

    if (!emit) {
      authChannel.onmessage = message => {
        console.log(message);
        switch (message.data) {
          case 'signOut':
            signOut();
            // authChannel.close();
            break;
          default:
            break;
        }

        emit = true;

        return;
      };
    }
  }, []);

  useEffect(() => {
    const { 'eschart.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then(response => {
          const { email, roles, permissions, avatar } = response.data;

          setUser({ email, roles, permissions, avatar });
        })
        .catch(error => {
          console.error(`Router '/me' with error ${error}`);
          signOut();
          authChannel.close();
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

      const customToastSuccess = theme === 'dark' && {
        style: {
          background: '#1e293b',
          color: '#f1f5f9'
        }
      };

      toast.success('Login efetuado com sucesso!', customToastSuccess);
      Router.push('/dashboard');
    } catch {
      toast.error('Email ou senha incorreto!', {
        style: {
          fontSize: '1rem'
        },
        duration: 6000
      });
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  return auth;
}
