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

  useEffect(() => {
    setLoading(true);
    getPermissionsApi().then((res) => setData(res.list || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="权限点查看" subtitle="权限 code 与 module/resource/action 结构" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
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
