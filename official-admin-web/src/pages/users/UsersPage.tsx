import { Button, Card, Form, Input, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getUsersApi } from '@/api/user';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { UserItem } from '@/types/business';

export default function UsersPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserItem[]>([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getUsersApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <PageHeader title="用户管理" subtitle="统一管理后台账号、状态与基础信息" extra={<Button type="primary">新建用户</Button>} />
      <Card style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="关键词"><Input placeholder="用户名/昵称" /></Form.Item>
          <Form.Item label="状态"><Select style={{ width: 140 }} options={[{ label: '启用', value: 'ACTIVE' }, { label: '禁用', value: 'INACTIVE' }]} /></Form.Item>
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Form>
      </Card>
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && data.length === 0} onRetry={fetchUsers} />
        {!loading && !error && data.length > 0 && (
          <Table
            rowKey="id"
            dataSource={data}
            pagination={{ total: data.length, showSizeChanger: true }}
            columns={[
              { title: '用户名', dataIndex: 'username' },
              { title: '显示名', dataIndex: 'displayName' },
              { title: '邮箱', dataIndex: 'email' },
              { title: '手机号', dataIndex: 'phone' },
              { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
              { title: '操作', render: () => <Space><a>详情</a><a>编辑</a></Space> }
            ]}
          />
        )}
      </Card>
    </>
  );
}
