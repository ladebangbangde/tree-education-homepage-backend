import { adaptAuditLogs, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { AuditLog } from '@/types/business';
import request from '@/utils/request';

export const getAuditLogsApi = async (): Promise<ListResponse<AuditLog>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/audit/operation-logs');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptAuditLogs(normalized.list) };
};
