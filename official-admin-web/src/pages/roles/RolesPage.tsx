import { Card, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getRolesApi } from '@/api/role';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { RoleItem } from '@/types/business';

export default function RolesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RoleItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getRolesApi().then((res) => setData(res.list || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="角色管理" subtitle="角色编码、数据范围与可用性查看" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
        {!loading && !error && !!data.length && (
          <Table rowKey="id" dataSource={data} columns={[
            { title: '角色编码', dataIndex: 'code' },
            { title: '角色名称', dataIndex: 'name' },
            { title: '数据范围', dataIndex: 'dataScope' },
            { title: '状态', dataIndex: 'status', render: (v) => <Tag color={v === 'ACTIVE' ? 'success' : 'default'}>{v}</Tag> },
            { title: '操作', render: () => <Space><a>权限</a><a>编辑</a></Space> }
          ]} />
        )}
      </Card>
    </>
  );
}
