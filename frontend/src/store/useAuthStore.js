import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      console.log("error is auth");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("Login succesfull");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created.");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      toast.success("Logged Out");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("auth/updateprofile", data, {
        withCredentials: true,
      });
      set({ authUser: res.data });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  },
}));
