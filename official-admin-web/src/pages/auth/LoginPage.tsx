import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '@/api/auth';
import { DEFAULT_HOME_PATH } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await loginApi(values);
      setToken(result.token);
      navigate(DEFAULT_HOME_PATH, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20 }}>
      <Card style={{ width: 420, borderRadius: 14, boxShadow: '0 16px 40px rgba(16,24,40,.08)' }} bodyStyle={{ padding: 32 }}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          留学教育机构后台
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Official Admin Web · 安全、稳定、企业级管理平台
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
            <Input size="large" placeholder="请输入账号" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            登录后台
          </Button>
        </Form>
      </Card>
    </div>
  );
}
