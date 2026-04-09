import { Button, Card, Descriptions, Drawer, Form, Input, Select, Space, Table, Tag, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getUsersApi } from '@/api/user';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { UserItem } from '@/types/business';

type UserDrawerMode = 'create' | 'edit';

export default function UsersPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserItem[]>([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState({ keyword: '', status: undefined as string | undefined });
  const [mode, setMode] = useState<UserDrawerMode>('create');
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<UserItem | null>(null);
  const [detailTarget, setDetailTarget] = useState<UserItem | null>(null);
  const [form] = Form.useForm();

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

  const filteredData = useMemo(() => data.filter((item) => {
    const hitKeyword = !query.keyword || [item.username, item.displayName].some((field) => field?.toLowerCase().includes(query.keyword.toLowerCase()));
    const hitStatus = !query.status || item.status === query.status;
    return hitKeyword && hitStatus;
  }), [data, query]);

  const openCreate = () => {
    setMode('create');
    setEditTarget(null);
    setCreateOpen(true);
    form.resetFields();
  };

  const openEdit = (record: UserItem) => {
    setMode('edit');
    setCreateOpen(false);
    setEditTarget(record);
    form.setFieldsValue({ ...record, password: undefined });
  };

  const submitUserForm = async () => {
    const values = await form.validateFields();
    message.success(`${mode === 'create' ? '新建' : '编辑'}用户操作已提交（占位）`);
    setEditTarget(null);
    setCreateOpen(false);
    if (mode === 'create') form.resetFields();
    console.info('user-form-payload', values);
  };

  return (
    <>
      <PageHeader
        title="用户管理"
        subtitle="统一管理后台账号、状态与基础信息"
        extra={<Button type="primary" onClick={openCreate}>新建用户</Button>}
      />
      <Card className="admin-filter-card">
        <Form layout="inline" className="admin-filter-form">
          <Form.Item label="关键词">
            <Input
              placeholder="用户名/昵称"
              allowClear
              value={query.keyword}
              onChange={(e) => setQuery((prev) => ({ ...prev, keyword: e.target.value }))}
            />
          </Form.Item>
          <Form.Item label="状态">
            <Select
              style={{ width: 140 }}
              allowClear
              placeholder="全部"
              value={query.status}
              options={[{ label: '启用', value: 'ACTIVE' }, { label: '禁用', value: 'INACTIVE' }]}
              onChange={(status) => setQuery((prev) => ({ ...prev, status }))}
            />
          </Form.Item>
          <Button type="primary">查询</Button>
          <Button onClick={() => setQuery({ keyword: '', status: undefined })}>重置</Button>
        </Form>
      </Card>
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && filteredData.length === 0} onRetry={fetchUsers} />
        {!loading && !error && filteredData.length > 0 && (
          <Table
            rowKey="id"
            dataSource={filteredData}
            pagination={{ total: filteredData.length, showSizeChanger: true }}
            columns={[
              { title: '用户名', dataIndex: 'username' },
              { title: '显示名', dataIndex: 'displayName' },
              { title: '邮箱', dataIndex: 'email' },
              { title: '手机号', dataIndex: 'phone' },
              { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
              {
                title: '操作',
                render: (_, record) => (
                  <Space>
                    <a onClick={() => setDetailTarget(record)}>详情</a>
                    <a onClick={() => openEdit(record)}>编辑</a>
                  </Space>
                )
              }
            ]}
          />
        )}
      </Card>

      <Drawer
        title={mode === 'create' ? '新建用户' : `编辑用户 - ${editTarget?.displayName ?? ''}`}
        width={500}
        open={createOpen || !!editTarget}
        onClose={() => {
          setEditTarget(null);
          setCreateOpen(false);
        }}
        extra={<Button type="primary" onClick={submitUserForm}>保存</Button>}
      >
        <Form form={form} layout="vertical" initialValues={{ status: 'ACTIVE' }}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="如 admin.zhang" />
          </Form.Item>
          <Form.Item label="显示名" name="displayName" rules={[{ required: true, message: '请输入显示名' }]}>
            <Input placeholder="如 张老师" />
          </Form.Item>
          <Form.Item label="邮箱" name="email"><Input /></Form.Item>
          <Form.Item label="手机号" name="phone"><Input /></Form.Item>
          <Form.Item label="状态" name="status"><Select options={[{ label: '启用', value: 'ACTIVE' }, { label: '禁用', value: 'INACTIVE' }]} /></Form.Item>
          {mode === 'create' && <Form.Item label="初始密码" name="password"><Input.Password placeholder="仅新建时填写" /></Form.Item>}
        </Form>
      </Drawer>

      <Drawer
        title={`用户详情 - ${detailTarget?.displayName ?? ''}`}
        width={560}
        open={!!detailTarget}
        onClose={() => setDetailTarget(null)}
      >
        {detailTarget && (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Descriptions bordered column={1} items={[
              { key: 'username', label: '用户名', children: detailTarget.username },
              { key: 'displayName', label: '显示名', children: detailTarget.displayName },
              { key: 'email', label: '邮箱', children: detailTarget.email },
              { key: 'phone', label: '手机号', children: detailTarget.phone },
              { key: 'status', label: '状态', children: <StatusTag status={detailTarget.status} /> }
            ]} />
            <Card size="small" title="角色与权限（占位）">
              <Space wrap>
                <Tag color="blue">运营管理员</Tag>
                <Tag color="purple">CMS 发布</Tag>
                <Tag color="processing">线索查看</Tag>
              </Space>
            </Card>
          </Space>
        )}
      </Drawer>
    </>
  );
}
