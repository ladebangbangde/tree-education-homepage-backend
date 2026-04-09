import dayjs from 'dayjs';
import { Card, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getLeadsApi } from '@/api/lead';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { LeadItem } from '@/types/business';

const maskPhone = (phone: string) => phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') ?? '-';

export default function LeadsPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LeadItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getLeadsApi().then((res) => setData(res.list || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="线索管理" subtitle="学生咨询线索全链路查看" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data.length} />
        {!loading && !error && !!data.length && <Table rowKey="id" dataSource={data} columns={[
          { title: '学生姓名', dataIndex: 'studentName' },
          { title: '手机号', dataIndex: 'phone', render: maskPhone },
          { title: '来源渠道', dataIndex: 'sourceChannel' },
          { title: '状态', dataIndex: 'status', render: (v) => <Tag color="processing">{v}</Tag> },
          { title: '顾问', dataIndex: 'consultant' },
          { title: '意向等级', dataIndex: 'intentionLevel', render: (v) => <Tag color={v === 'HIGH' ? 'error' : v === 'MEDIUM' ? 'warning' : 'default'}>{v}</Tag> },
          { title: '创建时间', dataIndex: 'createdAt', render: (v) => dayjs(v).format('YYYY-MM-DD HH:mm') },
          { title: '操作', render: () => <Space><a>详情</a><a>跟进</a></Space> }
        ]} />}
      </Card>
    </>
  );
}
