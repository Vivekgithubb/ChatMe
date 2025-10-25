import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
// import { useAuthStore } from "./store/useAuthStore";

function App() {
  // const { authUser, login, isLoggedIn } = useAuthStore();
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* 🌌 Background Aurora Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">
        <div className="absolute -inset-40 bg-[conic-gradient(at_top_right,_#00f6ff_0deg,_#7c3aed_120deg,_#ff0077_240deg,_#00f6ff_360deg)] opacity-25 blur-[180px] animate-spin-slow" />
      </div>

      {/* 💬 Centered Page Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-screen px-4">
        <div className="w-full max-w-4xl text-center">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
