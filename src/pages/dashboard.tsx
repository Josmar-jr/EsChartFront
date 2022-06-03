import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Sidebar />
      <h1>{user?.email}</h1>
    </>
  );
}
