import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Layout style={{ minHeight: '100vh', background: 'radial-gradient(circle at 20% 20%, #e6efff, #f7f9fc 40%, #f6f8fb)' }}>
      <Outlet />
    </Layout>
  );
}
