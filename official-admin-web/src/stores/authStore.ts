import { create } from 'zustand';
import { CurrentUser } from '@/types/auth';
import { tokenStorage } from '@/utils/storage';

interface AuthState {
  token: string;
  userInfo: CurrentUser | null;
  permissions: string[];
  setToken: (token: string) => void;
  setUserInfo: (user: CurrentUser | null) => void;
  setPermissions: (permissions: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: tokenStorage.get(),
  userInfo: null,
  permissions: [],
  setToken: (token) => {
    tokenStorage.set(token);
    set({ token });
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  setPermissions: (permissions) => set({ permissions }),
  logout: () => {
    tokenStorage.clear();
    set({ token: '', userInfo: null, permissions: [] });
  }
}));
