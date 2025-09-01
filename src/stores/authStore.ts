import { create } from 'zustand';
import type { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  setPreToken: (token: string) => void;
  setToken: (token: string, user: User) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  preToken: undefined,
  token: undefined,
  user: undefined,
  isLoading: false,
  
        setPreToken: (preToken: string) => set({ preToken }),
      
      setToken: (token: string, user: User) => set({ 
        token, 
        user, 
        preToken: undefined 
      }),
  
  setUser: (user: User) => set({ user }),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  
  clear: () => set({ 
    preToken: undefined, 
    token: undefined, 
    user: undefined, 
    isLoading: false 
  }),
})); 