import {
  AppstoreOutlined,
  AuditOutlined,
  BellOutlined,
  BookOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Alert, Avatar, Button, Dropdown, Input, Layout, Menu, Result, Space, Spin, Typography, message } from 'antd';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getMeApi } from '@/api/auth';
import { getMenuTreeApi } from '@/api/menu';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb';
import { LOGIN_PATH } from '@/constants/routes';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import { MenuNode } from '@/types/menu';

const { Header, Sider, Content } = Layout;
const iconMap: Record<string, ReactNode> = {
  dashboard: <AppstoreOutlined />,
  users: <TeamOutlined />,
  roles: <SafetyOutlined />,
  menus: <MenuUnfoldOutlined />,
  permissions: <SafetyOutlined />,
  cms: <BookOutlined />,
  leads: <UserOutlined />,
  system: <SettingOutlined />,
  site: <SettingOutlined />,
  audit: <AuditOutlined />
};

const toAntdItems = (nodes: MenuNode[]): any[] =>
  nodes
    .filter((node) => node.enabled)
    .map((node) => ({
      key: node.path,
      icon: iconMap[node.icon ?? ''] || <AppstoreOutlined />,
      label: node.name,
      children: node.children?.length ? toAntdItems(node.children) : undefined
    }));

const getBreadcrumbTrail = (menus: MenuNode[], path: string, parent: string[] = []): string[] => {
  for (const menu of menus) {
    const trail = [...parent, menu.name];
    if (menu.path === path) return trail;
    if (menu.children?.length) {
      const child = getBreadcrumbTrail(menu.children, path, trail);
      if (child.length) return child;
    }
  }
  return [];
};

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const collapsed = useAppStore((s) => s.collapsed);
  const setCollapsed = useAppStore((s) => s.setCollapsed);
  const setBreadcrumbs = useAppStore((s) => s.setBreadcrumbs);
  const { userInfo, setUserInfo, setPermissions, logout } = useAuthStore();

  const [menus, setMenus] = useState<MenuNode[]>([]);
  const [bootstrapLoading, setBootstrapLoading] = useState(true);
  const [menuError, setMenuError] = useState('');

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      setBootstrapLoading(true);
      try {
        const me = await getMeApi();
        if (!active) return;
        setUserInfo(me);
        setPermissions(me.permissions || []);
      } catch (e: any) {
        if (!active) return;
        message.error(e?.message || '登录态校验失败，请重新登录');
        logout();
        navigate(LOGIN_PATH, { replace: true });
        return;
      }

      try {
        const menuData = await getMenuTreeApi();
        if (!active) return;
        setMenus(menuData);
        setMenuError('');
      } catch (e: any) {
        if (!active) return;
        setMenuError(e?.message || '菜单加载失败');
      } finally {
        if (active) {
          setBootstrapLoading(false);
        }
      }
    };

    bootstrap();
    return () => {
      active = false;
    };
  }, [logout, navigate, setPermissions, setUserInfo]);

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbTrail(menus, location.pathname));
  }, [location.pathname, menus, setBreadcrumbs]);

  const menuItems = useMemo(() => toAntdItems(menus), [menus]);

  const userMenu = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        logout();
        navigate(LOGIN_PATH, { replace: true });
      }
    }
  ];

  if (bootstrapLoading) {
    return (
      <Result
        icon={<Spin size="large" />}
        title="正在加载后台初始化数据"
        subTitle="请稍候，正在获取用户信息与菜单。"
      />
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={238}
        style={{ background: '#0f172a', boxShadow: '2px 0 8px rgba(15,23,42,.16)' }}
      >
        <div style={{ color: '#fff', padding: '16px 20px', fontWeight: 600, fontSize: 16 }}>{collapsed ? 'OA' : 'Official Admin'}</div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderInlineEnd: 'none', background: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', borderBottom: '1px solid #eef0f4' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between', gap: 12 }}>
            <Space>
              <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
              <AppBreadcrumb />
            </Space>
            <Input.Search placeholder="全局搜索（预留）" style={{ maxWidth: 320 }} allowClear />
            <Space size={16}>
              <Button type="text" icon={<BellOutlined />} />
              <Dropdown menu={{ items: userMenu }}>
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar icon={<UserOutlined />} />
                  <div>
                    <Typography.Text style={{ display: 'block', lineHeight: 1.1 }}>{userInfo?.displayName ?? '管理员'}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {userInfo?.username ?? '-'}
                    </Typography.Text>
                  </div>
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content style={{ padding: 20, background: '#f3f5f9' }}>
          {menuError && (
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 12 }}
              message="菜单加载失败"
              description={menuError}
            />
          )}
          <div style={{ minHeight: 'calc(100vh - 104px)' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
