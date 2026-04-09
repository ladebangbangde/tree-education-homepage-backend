import { adaptRoles, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { RoleItem } from '@/types/business';
import request from '@/utils/request';

export const getRolesApi = async (): Promise<ListResponse<RoleItem>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/roles');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptRoles(normalized.list) };
};
