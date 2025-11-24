import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/profileHeader";
import ChatsList from "../components/ChatsList";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ContactsList from "../components/ContactsList";
import ChatContainer from "../components/ChatContainer";
import NoConverstionPlaceholder from "../components/NoConverstionPlaceholder";

function ChatPage() {
  const { logout, isLogginOut } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();

  const Logout = () => {
    logout();
  };

  return (
    <div className="relative w-full h-[80vh] bg-slate-700 shadow-sm rounded-lg overflow-hidden ">
      <div className="flex h-full ">
        <div className="w-80 flex-none bg-slate-800/50 backdrop-blur-sm flex flex-col border-r pt-5 border-slate-700/50">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        {/* Chat Container: flex-1 makes this take up all remaining width */}
        <div className="flex-1 flex flex-col pt-5 bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConverstionPlaceholder />}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
