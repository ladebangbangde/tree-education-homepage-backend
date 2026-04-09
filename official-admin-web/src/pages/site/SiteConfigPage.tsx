import { Card, Descriptions, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getSiteConfigApi } from '@/api/site';
import PageHeader from '@/components/common/PageHeader';
import PageState from '@/components/feedback/PageState';
import { SiteConfig } from '@/types/business';

export default function SiteConfigPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SiteConfig | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getSiteConfigApi().then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="站点配置" subtitle="官方站点核心信息与联系配置" />
      <Card>
        <PageState loading={loading} error={error} empty={!loading && !error && !data} />
        {data && !loading && !error && (
          <Descriptions column={2} bordered>
            <Descriptions.Item label="site_code">{data.site_code}</Descriptions.Item>
            <Descriptions.Item label="site_name">{data.site_name}</Descriptions.Item>
            <Descriptions.Item label="default_locale">{data.default_locale}</Descriptions.Item>
            <Descriptions.Item label="support_email">{data.support_email}</Descriptions.Item>
            <Descriptions.Item label="support_phone">{data.support_phone}</Descriptions.Item>
            <Descriptions.Item label="status"><Tag color={data.status === 'ENABLED' ? 'success' : 'default'}>{data.status}</Tag></Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </>
  );
}
