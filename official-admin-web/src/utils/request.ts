import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { ApiResponse } from '@/types/api';
import { tokenStorage } from '@/utils/storage';
import { LOGIN_PATH } from '@/constants/routes';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000
});

service.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse<unknown>;
    if (!payload || typeof payload.code !== 'string') {
      return response.data;
    }

    if (payload.code === '0000') {
      return payload.data;
    }

    if (payload.code === 'A001') {
      tokenStorage.clear();
      message.error('登录态失效，请重新登录');
      window.location.href = LOGIN_PATH;
      return Promise.reject(new Error(payload.message));
    }

    message.error(payload.message || '请求失败');
    return Promise.reject(new Error(payload.message));
  },
  (error: AxiosError<{ message?: string }>) => {
    const msg = error.response?.data?.message || error.message || '网络异常';
    message.error(msg);
    return Promise.reject(error);
  }
);

export default service;
