import dayjs from 'dayjs';
import { Button, Card, Drawer, Form, Input, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
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
  const [query, setQuery] = useState({ title: '', status: undefined as string | undefined });
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CmsArticle | null>(null);
  const [form] = Form.useForm();

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

  const filtered = data.filter((item) => {
    const titleHit = !query.title || item.title.toLowerCase().includes(query.title.toLowerCase());
    const statusHit = !query.status || item.status === query.status;
    return titleHit && statusHit;
  });

  return (
    <>
      <PageHeader title="CMS 文章管理" subtitle="统一管理官网内容发布状态" extra={<Button type="primary" onClick={() => { setCreateOpen(true); form.resetFields(); }}>新建文章</Button>} />
      <Card className="admin-filter-card">
        <Form layout="inline" className="admin-filter-form">
          <Form.Item label="标题"><Input allowClear value={query.title} onChange={(e) => setQuery((prev) => ({ ...prev, title: e.target.value }))} /></Form.Item>
          <Form.Item label="状态"><Select allowClear style={{ width: 140 }} options={[{ label: '草稿', value: 'DRAFT' }, { label: '已发布', value: 'PUBLISHED' }]} value={query.status} onChange={(status) => setQuery((prev) => ({ ...prev, status }))} /></Form.Item>
          <Button type="primary">筛选</Button>
          <Button onClick={() => setQuery({ title: '', status: undefined })}>重置</Button>
        </Form>
      </Card>
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !filtered.length} onRetry={fetchCmsArticles} />
        {!loading && !error && !!filtered.length && <Table rowKey="id" dataSource={filtered} columns={[
          { title: '标题', dataIndex: 'title' },
          { title: 'Slug', dataIndex: 'slug' },
          { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
          { title: '发布时间', dataIndex: 'publishedAt', render: (v) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-') },
          {
            title: '操作',
            render: (_, record) => <Space>
              <a onClick={() => { setEditTarget(record); form.setFieldsValue(record); }}>编辑</a>
              <Popconfirm title="确认发布该文章？" onConfirm={() => message.success(`文章《${record.title}》发布动作已触发（占位）`)}>
                <a>发布</a>
              </Popconfirm>
              <a>预览</a>
            </Space>
          }
        ]} />}
      </Card>

      <Drawer
        title="新建文章"
        width={720}
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('cms-create-payload', values);
          message.success('文章新建已提交（占位）');
          setCreateOpen(false);
        }}>保存草稿</Button>}
      >
        <Form form={form} layout="vertical" initialValues={{ status: 'DRAFT' }}>
          <Form.Item label="标题" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Slug" name="slug"><Input /></Form.Item>
          <Form.Item label="摘要" name="summary"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item label="正文" name="content"><Input.TextArea rows={10} placeholder="富文本编辑器位于第二阶段接入" /></Form.Item>
          <Form.Item label="状态" name="status"><Select options={[{ label: '草稿', value: 'DRAFT' }, { label: '已发布', value: 'PUBLISHED' }]} /></Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title={`编辑文章 - ${editTarget?.title ?? ''}`}
        width={720}
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('cms-edit-payload', values);
          message.success('文章编辑已提交（占位）');
          setEditTarget(null);
        }}>保存</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Tag color="processing">编辑页面壳层已就绪，待接入文章保存接口与版本回滚能力。</Tag>
          <Form form={form} layout="vertical">
            <Form.Item label="标题" name="title"><Input /></Form.Item>
            <Form.Item label="Slug" name="slug"><Input /></Form.Item>
            <Form.Item label="正文" name="content"><Input.TextArea rows={10} /></Form.Item>
          </Form>
        </Space>
      </Drawer>
    </>
  );
}
