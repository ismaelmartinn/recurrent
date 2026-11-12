import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  isDemo: boolean;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  actions: {
    addUser: (newUser: User) => void;
    logout: () => void;
  };
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  loading: true,
  actions: {
    addUser: (newUser) => set({ user: newUser, loading: false }),
    logout: () => set({ user: null, loading: false }),
  },
}));
