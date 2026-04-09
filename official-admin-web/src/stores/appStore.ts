import { create } from 'zustand';

interface AppState {
  collapsed: boolean;
  breadcrumbs: string[];
  setCollapsed: (collapsed: boolean) => void;
  setBreadcrumbs: (breadcrumbs: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  collapsed: false,
  breadcrumbs: [],
  setCollapsed: (collapsed) => set({ collapsed }),
  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs })
}));
