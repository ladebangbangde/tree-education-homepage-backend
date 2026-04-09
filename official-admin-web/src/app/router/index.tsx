import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from './guards';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersPage from '@/pages/users/UsersPage';
import RolesPage from '@/pages/roles/RolesPage';
import MenusPage from '@/pages/menus/MenusPage';
import PermissionsPage from '@/pages/permissions/PermissionsPage';
import CmsArticlesPage from '@/pages/cms/CmsArticlesPage';
import LeadsPage from '@/pages/leads/LeadsPage';
import SystemConfigPage from '@/pages/system/SystemConfigPage';
import SiteConfigPage from '@/pages/site/SiteConfigPage';
import AuditLogsPage from '@/pages/audit/AuditLogsPage';

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: '/login', element: <LoginPage /> }]
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'roles', element: <RolesPage /> },
          { path: 'menus', element: <MenusPage /> },
          { path: 'permissions', element: <PermissionsPage /> },
          { path: 'cms/articles', element: <CmsArticlesPage /> },
          { path: 'leads', element: <LeadsPage /> },
          { path: 'system/config', element: <SystemConfigPage /> },
          { path: 'site/config', element: <SiteConfigPage /> },
          { path: 'audit/logs', element: <AuditLogsPage /> }
        ]
      }
    ]
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> }
]);
