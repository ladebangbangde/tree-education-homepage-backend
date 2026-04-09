import dayjs from 'dayjs';
import { Button, Card, Descriptions, Drawer, Form, Input, Select, Space, Table, Tag, Timeline, message } from 'antd';
import { useEffect, useState } from 'react';
import { getLeadsApi } from '@/api/lead';
import StatusTag from '@/components/common/StatusTag';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { LeadItem } from '@/types/business';

const maskPhone = (phone: string) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') ?? '-';

export default function LeadsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LeadItem[]>([]);
  const [error, setError] = useState('');
  const [detailLead, setDetailLead] = useState<LeadItem | null>(null);
  const [assignLead, setAssignLead] = useState<LeadItem | null>(null);
  const [form] = Form.useForm();

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getLeadsApi();
      setData(res.list || []);
    } catch (e: any) {
      setError(e?.message || '加载失败');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      <PageHeader title="线索管理" subtitle="学生咨询线索全链路查看" />
      <Card className="admin-content-card">
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} onRetry={fetchLeads} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: '学生姓名', dataIndex: 'studentName' },
          { title: '手机号', dataIndex: 'phone', render: maskPhone },
          { title: '来源渠道', dataIndex: 'sourceChannel' },
          { title: '状态', dataIndex: 'status', render: (v) => <StatusTag status={v} /> },
          { title: '顾问', dataIndex: 'consultant' },
          { title: '意向等级', dataIndex: 'intentionLevel', render: (v) => <Tag color={v === 'HIGH' ? 'error' : v === 'MEDIUM' ? 'warning' : 'default'}>{v}</Tag> },
          { title: '创建时间', dataIndex: 'createdAt', render: (v) => (v ? dayjs(v).format('YYYY-MM-DD HH:mm') : '-') },
          {
            title: '操作', render: (_, record) => <Space>
              <a onClick={() => setDetailLead(record)}>详情</a>
              <a>跟进记录</a>
              <a onClick={() => { setAssignLead(record); form.setFieldsValue({ consultant: record.consultant }); }}>分配</a>
            </Space>
          }
        ]} />}
      </Card>

      <Drawer width={620} title={`线索详情 - ${detailLead?.studentName ?? ''}`} open={!!detailLead} onClose={() => setDetailLead(null)}>
        {detailLead && (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Descriptions bordered column={1} items={[
              { key: 'studentName', label: '学生姓名', children: detailLead.studentName },
              { key: 'phone', label: '手机号', children: detailLead.phone },
              { key: 'sourceChannel', label: '来源渠道', children: detailLead.sourceChannel },
              { key: 'consultant', label: '当前顾问', children: detailLead.consultant },
              { key: 'status', label: '线索状态', children: <StatusTag status={detailLead.status} /> }
            ]} />
            <Card size="small" title="跟进记录（占位）">
              <Timeline items={[
                { color: 'blue', children: '2026-04-08 09:10 首次电话触达，家长希望了解英美本科申请。' },
                { color: 'green', children: '2026-04-08 15:30 已发送案例包，约定周末到访。' }
              ]} />
            </Card>
          </Space>
        )}
      </Drawer>

      <Drawer
        width={460}
        title={`分配线索 - ${assignLead?.studentName ?? ''}`}
        open={!!assignLead}
        onClose={() => setAssignLead(null)}
        extra={<Button type="primary" onClick={async () => {
          const values = await form.validateFields();
          console.info('lead-assign-payload', values);
          message.success('线索分配已提交（占位）');
          setAssignLead(null);
        }}>确认分配</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Tag color="processing">分配入口已完成，待接入顾问负载与轮询策略。</Tag>
          <Form form={form} layout="vertical">
            <Form.Item label="分配顾问" name="consultant" rules={[{ required: true, message: '请选择顾问' }]}>
              <Select options={[{ label: '顾问A', value: '顾问A' }, { label: '顾问B', value: '顾问B' }, { label: '顾问C', value: '顾问C' }]} />
            </Form.Item>
            <Form.Item label="备注" name="note"><Input.TextArea rows={4} placeholder="输入分配原因与注意事项" /></Form.Item>
          </Form>
        </Space>
      </Drawer>
    </>
  );
}
