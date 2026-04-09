import { Button, Card, Drawer, Form, Input, Select, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { getSystemConfigsApi } from '@/api/system';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { ConfigItem } from '@/types/business';

export default function SystemConfigPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ConfigItem[]>([]);
  const [error, setError] = useState('');
  const [editTarget, setEditTarget] = useState<ConfigItem | null>(null);
  const [form] = Form.useForm();

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
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchSystemConfigs} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: '配置 Key', dataIndex: 'key' },
          { title: '配置 Value', dataIndex: 'value' },
          { title: 'Group', dataIndex: 'group', render: (v) => <Tag>{v}</Tag> },
          { title: 'Type', dataIndex: 'type', render: (v) => <Tag color="blue">{v}</Tag> },
          {
            title: '操作',
            render: (_, record) => <a onClick={() => {
              setEditTarget(record);
              form.setFieldsValue(record);
            }}>编辑</a>
          }
        ]} />}
      </Card>

      <Drawer
        width={560}
        title={`编辑系统配置 - ${editTarget?.key ?? ''}`}
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('system-config-edit-payload', values);
          message.success('系统配置更新已提交（占位）');
          setEditTarget(null);
        }}>保存</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Tag color="processing">表单布局已预留，待接入配置生效范围/灰度发布能力。</Tag>
          <Form form={form} layout="vertical">
            <Form.Item label="配置 Key" name="key"><Input disabled /></Form.Item>
            <Form.Item label="配置 Value" name="value"><Input.TextArea rows={4} /></Form.Item>
            <Form.Item label="配置分组" name="group"><Input /></Form.Item>
            <Form.Item label="值类型" name="type"><Select options={[{ label: 'String', value: 'STRING' }, { label: 'Boolean', value: 'BOOLEAN' }, { label: 'Number', value: 'NUMBER' }]} /></Form.Item>
          </Form>
        </Space>
      </Drawer>
    </>
  );
}
