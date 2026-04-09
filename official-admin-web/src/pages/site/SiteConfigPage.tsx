import { Card, Descriptions } from 'antd';
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

  const fetchSiteConfig = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getSiteConfigApi();
      setData(res);
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
      <PageHeader title="站点配置" subtitle="官方站点核心信息与联系配置" />
      <Card>
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
    </>
  );
}
