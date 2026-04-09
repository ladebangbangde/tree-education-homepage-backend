import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to={LOGIN_PATH} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const token = useAuthStore((s) => s.token);
  if (token) {
    return <Navigate to={DEFAULT_HOME_PATH} replace />;
  }
  return <Outlet />;
}
