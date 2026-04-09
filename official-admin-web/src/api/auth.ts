import { adaptCurrentUser } from '@/adapters/admin';
import { CurrentUser, LoginPayload, LoginResult } from '@/types/auth';
import request from '@/utils/request';

export const loginApi = (payload: LoginPayload) => request.post<never, LoginResult>('/admin/auth/login', payload);

export const getMeApi = async (): Promise<CurrentUser> => {
  const data = await request.get<never, Record<string, unknown>>('/admin/auth/me');
  return adaptCurrentUser(data);
};
