import { Layout } from '../components/Layout';

import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl"></h1>
    </Layout>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
});
