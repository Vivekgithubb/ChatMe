import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
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
      set({ chats: res.data });
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
  sendMessage: async (messagedata) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();
    const tempId = `temp-${Date.now()}`;
    const optimisticMesage = {
      _id: tempId,
      senderId: authUser._id,
      receivedId: selectedUser._id,
      text: messagedata.text,
      image: messagedata.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    //immediatly update the ui by adding the message
    set({ messages: [...messages, optimisticMesage] });
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messagedata
      );
      set({ messages: [...messages, res.data] });
    } catch (err) {
      console.log(err);
      set({ messages: messages });
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  },
}));
