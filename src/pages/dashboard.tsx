import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { withSSRAuth } from '../utils/withSSRAuth';
import { Can } from '../components/Can';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div>Loading</div>
  }

  return (
    <>
      <Sidebar />
      <h1>{user?.email}</h1>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
      <button onClick={() => signOut()}>SignOut</button>
    </>
  );
}

// export const getServerSideProps = withSSRAuth(async ctx => {
//   return {
//     props: {}
//   };
// });
