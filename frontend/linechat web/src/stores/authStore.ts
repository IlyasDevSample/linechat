import { create, StateCreator } from 'zustand';
import { devtools, DevtoolsOptions } from 'zustand/middleware';

type AuthStore = {
  bearerToken: string | null;
  setBearerToken: (token: string) => void;
};

const createStore: StateCreator<AuthStore> = (set) => ({
  bearerToken: null,
  setBearerToken: (token: string) => set({ bearerToken: token }),
});

export const useAuthStore = create<AuthStore>(
  devtools<AuthStore>(createStore) as StateCreator<AuthStore, [], []>,
);
