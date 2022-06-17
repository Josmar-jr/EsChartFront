import { useAuth } from '../contexts/AuthContext';

import { CircleNotch } from 'phosphor-react';

import { Layout } from '../components/Layout';
import { withSSRAuth } from '../utils/withSSRAuth';
// import { withSSRAuth } from '../utils/withSSRAuth';

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
    <div className="flex dark:bg-slate-900">
      <Layout>
        <h1 className="text-2xl">Dashboard</h1>
      </Layout>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
});
