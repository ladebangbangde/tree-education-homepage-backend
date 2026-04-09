import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { PermissionItem } from '@/types/business';

export const getPermissionsApi = () => request.get<never, ListResponse<PermissionItem>>('/admin/permissions');
