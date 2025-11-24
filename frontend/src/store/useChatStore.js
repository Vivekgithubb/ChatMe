import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  message: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("message/contacts");
      set({ allContacts: res.data });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("message/chats");
      set({ allContacts: res.data });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
