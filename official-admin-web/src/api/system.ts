import { adaptConfigItems, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { ConfigItem } from '@/types/business';
import request from '@/utils/request';

export const getSystemConfigsApi = async (): Promise<ListResponse<ConfigItem>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/system/config-items');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptConfigItems(normalized.list) };
};
