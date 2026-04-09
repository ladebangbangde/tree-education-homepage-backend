import { Breadcrumb } from 'antd';
import { useAppStore } from '@/stores/appStore';

export default function AppBreadcrumb() {
  const breadcrumbs = useAppStore((s) => s.breadcrumbs);
  return <Breadcrumb items={breadcrumbs.map((item) => ({ title: item }))} />;
}
