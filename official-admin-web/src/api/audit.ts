import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { AuditLog } from '@/types/business';

export const getAuditLogsApi = () => request.get<never, ListResponse<AuditLog>>('/admin/audit/operation-logs');
