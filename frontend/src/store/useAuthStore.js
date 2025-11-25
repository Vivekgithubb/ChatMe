import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE =
  import.meta.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("error is auth", err);
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
      get().connectSocket();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
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
      get().connectSocket();
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
      get().disconnectSocket();
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
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE, { withCredentials: true });
    if (socket && socket.connected) return;
    socket.connect();
    set({ socket });

    //listen for online users connect
    socket.on("getOnlineUsers", (userId) => {
      set({ onlineUsers: userId });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
