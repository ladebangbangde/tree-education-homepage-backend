import { Alert, Empty, Result, Skeleton } from 'antd';

interface PageStateProps {
  loading?: boolean;
  error?: string;
  unauthorized?: boolean;
  empty?: boolean;
}

export default function PageState({ loading, error, unauthorized, empty }: PageStateProps) {
  if (loading) return <Skeleton active paragraph={{ rows: 6 }} />;
  if (unauthorized) return <Result status="403" title="无权限访问" subTitle="请联系管理员开通权限" />;
  if (error) return <Alert type="error" message="请求失败" description={error} showIcon />;
  if (empty) return <Empty description="暂无数据" />;
  return null;
}
