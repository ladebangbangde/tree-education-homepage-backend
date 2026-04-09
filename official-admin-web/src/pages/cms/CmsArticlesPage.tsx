import dayjs from 'dayjs';
import { Button, Card, Form, Input, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { getCmsArticlesApi } from '@/api/cms';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { CmsArticle } from '@/types/business';

export default function CmsArticlesPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CmsArticle[]>([]);
  const [error, setError] = useState('');

  const fetchCmsArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getCmsArticlesApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsArticles();
  }, []);

  return (
    <>
      <PageHeader title="CMS 文章管理" subtitle="统一管理官网内容发布状态" extra={<Button type="primary">新建文章</Button>} />
      <Card style={{ marginBottom: 16 }}>
        <Form layout="inline"><Form.Item label="标题"><Input /></Form.Item><Form.Item label="状态"><Select style={{ width: 120 }} options={[{ label: '草稿', value: 'DRAFT' }, { label: '已发布', value: 'PUBLISHED' }]} /></Form.Item><Button type="primary">筛选</Button></Form>
      </Card>
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchCmsArticles} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: '标题', dataIndex: 'title' },
          { title: 'Slug', dataIndex: 'slug' },
          { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
          { title: '发布时间', dataIndex: 'publishedAt', render: (v) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-') },
          { title: '操作', render: () => <Space><a>预览</a><a>编辑</a></Space> }
        ]} />}
      </Card>
    </>
  );
}
