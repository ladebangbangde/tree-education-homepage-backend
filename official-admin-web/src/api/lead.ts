import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { LeadItem } from '@/types/business';

export const getLeadsApi = () => request.get<never, ListResponse<LeadItem>>('/admin/leads');
