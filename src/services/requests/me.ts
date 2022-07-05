import { api } from '../apiClient';
import { User } from '../../contexts/AuthContext/types';

async function getMe() {
  const { data } = await api.get<User>('/extensao_ufrn_api/user/me');

  return data;
}

export { getMe };
