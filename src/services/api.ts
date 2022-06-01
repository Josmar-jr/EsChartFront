import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: `http://localhost:3000/fake`,
  headers: {
    Authorization: `Bearer ${cookies['eschart.token']}`
  }
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
  }
);