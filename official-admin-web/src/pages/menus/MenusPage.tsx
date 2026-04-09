import { Card, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getMenuTreeApi } from '@/api/menu';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { MenuNode } from '@/types/menu';

export default function MenusPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MenuNode[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getMenuTreeApi().then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="菜单管理" subtitle="菜单树与路由映射查看" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
        {!loading && !error && !!data.length && (
          <Table rowKey="id" dataSource={data} pagination={false} columns={[
            { title: '菜单名称', dataIndex: 'name' },
            { title: '路由', dataIndex: 'path' },
            { title: '类型', dataIndex: 'type', render: (v) => <Tag>{v}</Tag> },
            { title: '启用状态', dataIndex: 'enabled', render: (v) => <Tag color={v ? 'success' : 'default'}>{v ? '启用' : '禁用'}</Tag> }
          ]} expandable={{ defaultExpandAllRows: true }} />
        )}
      </Card>
    </>
  );
}
