import { api } from '../apiClient';

type APIAdminCredentials = {
  access: string;
  refresh: string;
};

const EMAIL_ADMIN = process.env.NEXT_PUBLIC_USERNAME_ADMIN;
const PASSWORD_ADMIN = process.env.NEXT_PUBLIC_PASSWORD_ADMIN;

async function requestAdminCredentials() {
  const { data } = await api.post<APIAdminCredentials>('/token', {
    email: EMAIL_ADMIN,
    password: PASSWORD_ADMIN
  });

  return {
    token: data.access,
    refreshToken: data.refresh
  };
}

export { requestAdminCredentials };
