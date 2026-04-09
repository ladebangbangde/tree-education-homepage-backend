import dayjs from 'dayjs';
import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getAuditLogsApi } from '@/api/audit';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { AuditLog } from '@/types/business';

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuditLog[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAuditLogsApi().then((res) => setData(res.list || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="审计日志" subtitle="后台操作记录与调用轨迹" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: 'operator', dataIndex: 'operator' },
          { title: 'module', dataIndex: 'module' },
          { title: 'action', dataIndex: 'action' },
          { title: 'requestPath', dataIndex: 'requestPath' },
          { title: 'requestMethod', dataIndex: 'requestMethod' },
          { title: 'successFlag', dataIndex: 'successFlag', render: (v) => <Tag color={v ? 'success' : 'error'}>{String(v)}</Tag> },
          { title: 'createdAt', dataIndex: 'createdAt', render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm:ss') }
        ]} />}
      </Card>
    </>
  );
}
