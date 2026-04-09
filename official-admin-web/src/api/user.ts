import { adaptUsers, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { UserItem } from '@/types/business';
import request from '@/utils/request';

export const getUsersApi = async (): Promise<ListResponse<UserItem>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/users');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptUsers(normalized.list) };
};
