import request from '@/utils/request';
import { MenuNode } from '@/types/menu';

export const getMenuTreeApi = () => request.get<never, MenuNode[]>('/admin/menus/tree');
