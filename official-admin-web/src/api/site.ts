import { adaptSiteConfig } from '@/adapters/admin';
import { SiteConfig } from '@/types/business';
import request from '@/utils/request';

export const getSiteConfigApi = async (): Promise<SiteConfig> => {
  const data = await request.get<never, Record<string, unknown>>('/admin/site/config');
  return adaptSiteConfig(data);
};
