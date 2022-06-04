import { withSSRAuth } from '../utils/withSSRAuth';

export default function RegisterData() {
  return (
    <>
      <div>Métricas</div>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async ctx => {
    return {
      props: {}
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator']
  }
);
