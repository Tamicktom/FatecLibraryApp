import { createStore } from "zustand";

type UserStore = {
  user: {
    id: string;
    name: string;
    email: string;
    isLogedIn: boolean;
  };
};

export const userStore = createStore<UserStore>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    isLogedIn: false,
  },
  actions: {
    login: (userData: { id: string; name: string; email: string }) => {
      set((state) => ({
        user: {
          ...state.user,
          ...userData,
          isLogedIn: true,
        },
      }));
    },
    logout: () => {
      set((state) => ({
        user: {
          ...state.user,
          id: "",
          name: "",
          email: "",
          isLogedIn: false,
        },
      }));
    },
  },
}));
