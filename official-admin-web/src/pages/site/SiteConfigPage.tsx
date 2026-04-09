import { Button, Card, Descriptions, Drawer, Form, Input, Select, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { getSiteConfigApi } from '@/api/site';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { SiteConfig } from '@/types/business';

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SiteConfig | null>(null);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchSiteConfig = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getSiteConfigApi();
      setData(res);
      form.setFieldsValue(res);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteConfig();
  }, []);

  return (
    <>
      <PageHeader
        title="站点配置"
        subtitle="官方站点核心信息与联系配置"
        extra={<Button disabled={!data} onClick={() => setEditOpen(true)}>编辑配置</Button>}
      />
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data} onRetry={fetchSiteConfig} />
        {data && !loading && !error && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="siteCode">{data.siteCode}</Descriptions.Item>
            <Descriptions.Item label="siteName">{data.siteName}</Descriptions.Item>
            <Descriptions.Item label="defaultLocale">{data.defaultLocale}</Descriptions.Item>
            <Descriptions.Item label="supportEmail">{data.supportEmail}</Descriptions.Item>
            <Descriptions.Item label="supportPhone">{data.supportPhone}</Descriptions.Item>
            <Descriptions.Item label="logoUrl">{data.logoUrl}</Descriptions.Item>
            <Descriptions.Item label="status"><StatusTag status={data.status} /></Descriptions.Item>
          </Descriptions>
        )}
      </Card>

      <Drawer
        width={560}
        title="编辑站点配置"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('site-config-edit-payload', values);
          message.success('站点配置更新已提交（占位）');
          setEditOpen(false);
        }}>保存</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Form form={form} layout="vertical">
            <Form.Item label="站点编码" name="siteCode"><Input disabled /></Form.Item>
            <Form.Item label="站点名称" name="siteName" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="默认语言" name="defaultLocale"><Select options={[{ label: 'zh-CN', value: 'zh-CN' }, { label: 'en-US', value: 'en-US' }]} /></Form.Item>
            <Form.Item label="支持邮箱" name="supportEmail"><Input /></Form.Item>
            <Form.Item label="支持电话" name="supportPhone"><Input /></Form.Item>
            <Form.Item label="Logo URL" name="logoUrl"><Input /></Form.Item>
          </Form>
        </Space>
      </Drawer>
    </>
  );
}
