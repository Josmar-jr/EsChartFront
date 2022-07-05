import { useAuth } from '../contexts/AuthContext';
import { validateUserPermissions } from '../utils/validadeUserPermissions';

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions = [], roles = [] }: UseCanParams) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validateUserPermissions({
    user: {
      permissions: user.permissions,
      roles: user.roles
    },
    permissions,
    roles
  });

  return userHasValidPermissions;
}
