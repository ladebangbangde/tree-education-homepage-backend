import request from '@/utils/request';
import { SiteConfig } from '@/types/business';

export const getSiteConfigApi = () => request.get<never, SiteConfig>('/admin/site/config');
