import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "Vivek", _id: 123, age: 25 },
  isLoggedIn: false,
  login: () => {
    console.log("helllo Login");
    set({ isLoggedIn: true });
  },
}));
