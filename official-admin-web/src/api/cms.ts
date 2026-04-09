import { adaptCmsArticles, normalizeListResponse } from '@/adapters/admin';
import { BackendPageResponse, ListResponse } from '@/types/api';
import { CmsArticle } from '@/types/business';
import request from '@/utils/request';

export const getCmsArticlesApi = async (): Promise<ListResponse<CmsArticle>> => {
  const data = await request.get<never, BackendPageResponse<Record<string, unknown>>>('/admin/cms/articles');
  const normalized = normalizeListResponse(data);
  return { ...normalized, list: adaptCmsArticles(normalized.list) };
};
