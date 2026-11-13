import { create } from "zustand";

const API = "http://localhost:3000";

interface User {
  id: number;
  username: string;
  isDemo: boolean;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  actions: {
    checkAuth: () => Promise<void>;
    setUser: (user: User) => void;
    logout: () => Promise<void>;
  };
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  actions: {
    checkAuth: async () => {
      try {
        const res = await fetch(`${API}/auth/me`, { credentials: "include" });
        if (!res.ok) throw new Error();
        set({ user: await res.json(), loading: false });
      } catch {
        set({ user: null, loading: false });
      }
    },
    setUser: (user) => set({ user, loading: false }),
    logout: async () => {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
      set({ user: null, loading: false });
    },
  },
}));

export const useUser = () => useUserStore((s) => s.user);
export const useUserLoading = () => useUserStore((s) => s.loading);
export const useUserActions = () => useUserStore((s) => s.actions);
