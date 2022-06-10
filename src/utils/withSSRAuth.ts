import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import decode from 'jwt-decode';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { validateUserPermissions } from './validadeUserPermissions';

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['eschart.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    if (options) {
      // const user = decode<{ permissions: string[], roles: string[] }>(token);
      // console.log(user);
      const { permissions, roles } = options;
      const user = {
        permissions,
        roles
      };

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'eschart.token');
        destroyCookie(ctx, 'eschart.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        };
      }
    }
  };
}
