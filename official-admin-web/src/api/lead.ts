import { adaptLeads, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { LeadItem } from '@/types/business';
import request from '@/utils/request';

export const getLeadsApi = async (): Promise<ListResponse<LeadItem>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/leads');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptLeads(normalized.list) };
};
