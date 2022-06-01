import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return <h1>{user?.email}</h1>;
}
