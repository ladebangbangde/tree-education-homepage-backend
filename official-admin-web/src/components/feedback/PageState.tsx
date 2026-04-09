import { Alert, Button, Empty, Result, Skeleton, Space } from 'antd';

interface PageStateProps {
  loading?: boolean;
  error?: string;
  unauthorized?: boolean;
  empty?: boolean;
  onRetry?: () => void;
}

export default function PageState({ loading, error, unauthorized, empty, onRetry }: PageStateProps) {
  if (loading) return <div className="admin-page-state"><Skeleton active paragraph={{ rows: 6 }} /></div>;
  if (unauthorized) return <Result status="403" title="无权限访问" subTitle="请联系管理员开通权限" />;
  if (error) {
    return (
      <div className="admin-page-state">
        <Alert
          type="error"
          message="请求失败"
          description={
            <Space direction="vertical">
              <span>{error}</span>
              {onRetry && (
                <Button size="small" onClick={onRetry}>
                  重试
                </Button>
              )}
            </Space>
          }
          showIcon
        />
      </div>
    );
  }
  if (empty) return <div className="admin-page-state"><Empty description="暂无数据" /></div>;
  return null;
}
