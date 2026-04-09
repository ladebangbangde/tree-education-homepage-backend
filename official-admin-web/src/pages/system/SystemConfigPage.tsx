import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getSystemConfigsApi } from '@/api/system';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { ConfigItem } from '@/types/business';

export default function SystemConfigPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ConfigItem[]>([]);
  const [error, setError] = useState('');

  const fetchSystemConfigs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getSystemConfigsApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemConfigs();
  }, []);

  return (
    <>
      <PageHeader title="系统配置" subtitle="配置项管理与系统级策略查看" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchSystemConfigs} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: '配置 Key', dataIndex: 'key' },
          { title: '配置 Value', dataIndex: 'value' },
          { title: 'Group', dataIndex: 'group', render: (v) => <Tag>{v}</Tag> },
          { title: 'Type', dataIndex: 'type', render: (v) => <Tag color="blue">{v}</Tag> }
        ]} />}
      </Card>
    </>
  );
}
