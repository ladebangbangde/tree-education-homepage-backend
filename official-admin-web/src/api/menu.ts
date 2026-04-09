import { adaptMenuTree } from '@/adapters/admin';
import { MenuNode } from '@/types/menu';
import request from '@/utils/request';

export const getMenuTreeApi = async (): Promise<MenuNode[]> => {
  const data = await request.get<never, unknown>('/admin/menus/tree');
  return adaptMenuTree(data);
};
