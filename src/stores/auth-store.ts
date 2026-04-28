import type { User } from '@/api/endpoints/auth';
import { create } from 'zustand'

export type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}))
