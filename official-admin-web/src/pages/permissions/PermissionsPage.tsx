import { Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getPermissionsApi } from '@/api/permission';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { PermissionItem } from '@/types/business';

export default function PermissionsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PermissionItem[]>([]);
  const [error, setError] = useState('');

  const fetchPermissions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getPermissionsApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <>
      <PageHeader title="权限点查看" subtitle="权限 code 与 module/resource/action 结构" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchPermissions} />
        {!loading && !error && !!data.length && <Table rowKey="code" dataSource={data} columns={[
          { title: '权限 Code', dataIndex: 'code' },
          { title: '权限名称', dataIndex: 'name' },
          { title: 'Module', dataIndex: 'module' },
          { title: 'Resource', dataIndex: 'resource' },
          { title: 'Action', dataIndex: 'action' }
        ]} />}
      </Card>
    </>
  );
}
