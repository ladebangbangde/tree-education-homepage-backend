import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { ConfigItem } from '@/types/business';

export const getSystemConfigsApi = () => request.get<never, ListResponse<ConfigItem>>('/admin/system/config-items');
