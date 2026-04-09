import { Button, Card, Descriptions, Drawer, Form, Input, Select, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { getRolesApi } from '@/api/role';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { RoleItem } from '@/types/business';

export default function RolesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RoleItem[]>([]);
  const [error, setError] = useState('');
  const [detailRole, setDetailRole] = useState<RoleItem | null>(null);
  const [permissionRole, setPermissionRole] = useState<RoleItem | null>(null);
  const [editRole, setEditRole] = useState<RoleItem | null>(null);
  const [form] = Form.useForm();

  const fetchRoles = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getRolesApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <PageHeader title="角色管理" subtitle="角色编码、数据范围与可用性查看" />
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchRoles} />
        {!loading && !error && !!data.length && (
          <Table
            rowKey="id"
            dataSource={data}
            columns={[
              { title: '角色编码', dataIndex: 'code' },
              { title: '角色名称', dataIndex: 'name' },
              { title: '数据范围', dataIndex: 'dataScope' },
              { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
              {
                title: '操作',
                render: (_, record) => (
                  <Space>
                    <a onClick={() => setDetailRole(record)}>详情</a>
                    <a onClick={() => setPermissionRole(record)}>权限</a>
                    <a
                      onClick={() => {
                        setEditRole(record);
                        form.setFieldsValue(record);
                      }}
                    >
                      编辑
                    </a>
                  </Space>
                )
              }
            ]}
          />
        )}
      </Card>

      <Drawer width={560} title={`角色详情 - ${detailRole?.name ?? ''}`} open={!!detailRole} onClose={() => setDetailRole(null)}>
        {detailRole && (
          <Descriptions bordered column={1} items={[
            { key: 'code', label: '角色编码', children: detailRole.code },
            { key: 'name', label: '角色名称', children: detailRole.name },
            { key: 'scope', label: '数据范围', children: detailRole.dataScope },
            { key: 'status', label: '状态', children: <StatusTag status={detailRole.status} /> }
          ]} />
        )}
      </Drawer>

      <Drawer width={520} title={`角色权限 - ${permissionRole?.name ?? ''}`} open={!!permissionRole} onClose={() => setPermissionRole(null)}>
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Tag color="blue">权限查看能力已就绪</Tag>
          <Card size="small" title="功能权限（占位）">用户查看、用户编辑、角色查看、CMS 发布。</Card>
          <Card size="small" title="数据权限（占位）">校区=全部；业务线=留学申请；学生线索=本人 + 下属。</Card>
        </Space>
      </Drawer>

      <Drawer
        width={520}
        title={`编辑角色 - ${editRole?.name ?? ''}`}
        open={!!editRole}
        onClose={() => setEditRole(null)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('role-edit-payload', values);
          message.success('角色编辑已提交（占位）');
          setEditRole(null);
        }}>保存</Button>}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="角色编码" name="code" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="角色名称" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="数据范围" name="dataScope"><Select options={[{ label: '全部', value: 'ALL' }, { label: '本部门', value: 'DEPT' }, { label: '本人', value: 'SELF' }]} /></Form.Item>
          <Form.Item label="状态" name="status"><Select options={[{ label: '启用', value: 'ACTIVE' }, { label: '禁用', value: 'INACTIVE' }]} /></Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
