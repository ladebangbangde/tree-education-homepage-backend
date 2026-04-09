import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { UserItem } from '@/types/business';

export const getUsersApi = () => request.get<never, ListResponse<UserItem>>('/admin/users');
