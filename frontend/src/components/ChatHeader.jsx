import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const online = onlineUsers.includes(selectedUser._id);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEsc);

    //cleanup
    window.removeEventListener("keydown", handleEsc);
  }, [setSelectedUser]);
  return (
    <div className="flex justify-between items-center border-b border-slate-600 max-h-[65px] px-5  flex-1">
      <div className="flex flex-row">
        <div className={`avatar ${online ? "online" : "offline"}`}>
          <div className="w-8 h-8 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} />
          </div>
        </div>

        <div className="pl-3">
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullname}
          </h3>
          <p className="text-sm text-slate-400">
            {online ? "online" : "offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
