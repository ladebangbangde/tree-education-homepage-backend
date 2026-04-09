import { adaptPermissions, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { PermissionItem } from '@/types/business';
import request from '@/utils/request';

export const getPermissionsApi = async (): Promise<ListResponse<PermissionItem>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/permissions');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptPermissions(normalized.list) };
};
