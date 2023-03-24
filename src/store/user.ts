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
}));
