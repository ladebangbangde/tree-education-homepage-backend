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

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAuditLogsApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return (
    <>
      <PageHeader title="审计日志" subtitle="后台操作记录与调用轨迹" />
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchAuditLogs} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: 'operator', dataIndex: 'operator' },
          { title: 'module', dataIndex: 'module' },
          { title: 'action', dataIndex: 'action' },
          { title: 'requestPath', dataIndex: 'requestPath' },
          { title: 'resultStatus', dataIndex: 'resultStatus', render: (v) => <Tag>{v}</Tag> },
          { title: 'riskTag', dataIndex: 'riskTag' },
          { title: 'createdAt', dataIndex: 'createdAt', render: (v) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm:ss') : '-') }
        ]} />}
      </Card>
    </>
  );
}
