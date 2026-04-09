import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { RoleItem } from '@/types/business';

export const getRolesApi = () => request.get<never, ListResponse<RoleItem>>('/admin/roles');
