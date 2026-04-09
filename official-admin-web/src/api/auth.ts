import request from '@/utils/request';
import { CurrentUser, LoginPayload, LoginResult } from '@/types/auth';

export const loginApi = (payload: LoginPayload) => request.post<never, LoginResult>('/admin/auth/login', payload);
export const getMeApi = () => request.get<never, CurrentUser>('/admin/auth/me');
