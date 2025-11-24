import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEsc);

    //cleanup
    window.removeEventListener("keydown", handleEsc);
  }, [setSelectedUser]);
  return (
    <div className="flex justify-between items-center border-b border-slate-600 max-h-[80px] px-5 pb-5 flex-1">
      <div className="flex flex-row">
        <div className="avatar online">
          <div className="w-8 h-8 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} />
          </div>
        </div>

        <div className="pl-3">
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullname}
          </h3>
          <p className="text-sm text-slate-400">online</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
