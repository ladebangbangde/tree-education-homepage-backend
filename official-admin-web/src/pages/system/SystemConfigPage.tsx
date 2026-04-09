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

  useEffect(() => {
    setLoading(true);
    getSystemConfigsApi().then((res) => setData(res.list || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="系统配置" subtitle="配置项管理与系统级策略查看" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
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
