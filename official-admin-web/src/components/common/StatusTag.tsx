import { Tag } from 'antd';
import { getStatusMeta } from '@/constants/status';

interface StatusTagProps {
  status?: string;
}

export default function StatusTag({ status }: StatusTagProps) {
  const meta = getStatusMeta(status);
  return <Tag className="admin-status-tag" color={meta.color}>{meta.text}</Tag>;
}
