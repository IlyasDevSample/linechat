import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthStore = {
  bearerToken: string | null;
  setBearerToken: (token: string, rememberMe: boolean) => void;
  getBearerToken: () => string | null;
  clearBearerToken: () => void;
};

const createStore: StateCreator<AuthStore> = (set) => ({
  bearerToken: null,
  setBearerToken: (token: string, rememberMe: boolean) => {
    set({ bearerToken: token });
    if (rememberMe) {
      // Store the token in a cookie with an expiration time of 10 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 10);
      document.cookie = `jwtToken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
    } else {
      // Store the token in session storage (expires when the browser is closed)
      document.cookie = `jwtToken=${token}; path=/`;
    }
  },
  getBearerToken: () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('jwtToken=')) {
        const jwtToken = cookie.substring('jwtToken='.length, cookie.length);
        set({ bearerToken: jwtToken });
        return jwtToken;
      }
    }
    return null;
  },
  clearBearerToken: () => {
    set({ bearerToken: null });
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  },
});

export const useAuthStore = create<AuthStore>(
  devtools<AuthStore>(createStore) as StateCreator<AuthStore, [], []>,
);
