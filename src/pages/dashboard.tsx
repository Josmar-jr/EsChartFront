import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';

import { CircleNotch } from 'phosphor-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <CircleNotch
          className="animate-spin text-primary"
          size={32}
          weight="bold"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

// export const getServerSideProps = withSSRAuth(async ctx => {
//   return {
//     props: {}
//   };
// });
