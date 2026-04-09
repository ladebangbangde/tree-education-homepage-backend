import { useAuthStore } from '@/stores/authStore';

export const hasPermission = (permissions: string[], code: string) => permissions.includes(code);

export const usePermission = () => {
  const permissions = useAuthStore((s) => s.permissions);

  return {
    permissions,
    can: (code: string) => hasPermission(permissions, code)
  };
};
