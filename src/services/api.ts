import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    Authorization: `Bearer ${cookies['eschart.token']}`
  }
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        // renovar token
        cookies = parseCookies();

        const { 'eschart.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('/refresh', {
              refreshToken
            })
            .then(response => {
              const { token } = response.data;

              setCookie(undefined, 'eschart.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              });
              setCookie(
                undefined,
                'eschart.refreshToken',
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                }
              );

              api.defaults.headers['Authorization'] = `Bearer ${token}`;

              failedRequestQueue.forEach(request => request.onSuccess(token));
              failedRequestQueue = [];
            })
            .catch(err => {
              failedRequestQueue.forEach(request => request.onFailure(err));
              failedRequestQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            }
          });
        });
      } else {
        // deslogar usuário
        signOut();
      }
    }
    return Promise.reject(error);
  }
);
