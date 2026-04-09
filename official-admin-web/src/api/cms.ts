import request from '@/utils/request';
import { ListResponse } from '@/types/api';
import { CmsArticle } from '@/types/business';

export const getCmsArticlesApi = () => request.get<never, ListResponse<CmsArticle>>('/admin/cms/articles');
