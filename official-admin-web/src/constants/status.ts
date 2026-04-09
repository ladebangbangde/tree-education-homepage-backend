export type StatusTone = 'success' | 'default' | 'processing' | 'warning' | 'error';

interface StatusMeta {
  text: string;
  color: StatusTone;
}

const STATUS_META_MAP: Record<string, StatusMeta> = {
  ACTIVE: { text: '启用', color: 'success' },
  ENABLED: { text: '启用', color: 'success' },
  PUBLISHED: { text: '已发布', color: 'success' },
  ONLINE: { text: '在线', color: 'success' },
  OPEN: { text: '开放', color: 'success' },

  INACTIVE: { text: '停用', color: 'default' },
  DISABLED: { text: '禁用', color: 'default' },
  OFFLINE: { text: '离线', color: 'default' },
  CLOSED: { text: '关闭', color: 'default' },

  DRAFT: { text: '草稿', color: 'processing' },
  PENDING: { text: '待处理', color: 'processing' },
  NEW: { text: '新建', color: 'processing' },

  REVIEWING: { text: '审核中', color: 'warning' },
  FOLLOWING: { text: '跟进中', color: 'warning' },

  REJECTED: { text: '已拒绝', color: 'error' },
  FAILED: { text: '失败', color: 'error' }
};

export const getStatusMeta = (status: string | undefined): StatusMeta => {
  const normalized = String(status || 'UNKNOWN').toUpperCase();
  return STATUS_META_MAP[normalized] ?? { text: normalized, color: 'default' };
};
