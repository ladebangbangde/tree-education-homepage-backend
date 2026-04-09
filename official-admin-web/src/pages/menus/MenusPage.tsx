import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getMenuTreeApi } from '@/api/menu';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { MenuNode } from '@/types/menu';

export default function MenusPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MenuNode[]>([]);
  const [error, setError] = useState('');

  const fetchMenus = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getMenuTreeApi();
      setData(res || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <>
      <PageHeader title="菜单管理" subtitle="菜单树与路由映射查看" />
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchMenus} />
        {!loading && !error && !!data.length && (
          <Table rowKey="id" dataSource={data} pagination={false} columns={[
            { title: '菜单名称', dataIndex: 'name' },
            { title: '路由', dataIndex: 'path' },
            { title: '类型', dataIndex: 'type', render: (v) => <Tag>{v}</Tag> },
            { title: '启用状态', dataIndex: 'enabled', render: (v) => <StatusTag status={v ? 'ENABLED' : 'DISABLED'} /> }
          ]} expandable={{ defaultExpandAllRows: true }} />
        )}
      </Card>
    </>
  );
}
