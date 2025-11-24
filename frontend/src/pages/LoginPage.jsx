import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function LoginPage() {
  const [form, setFormData] = useState({ name: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };
  const errors = 5;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-6">
      {/* floating gradient orbs */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute -left-24 -top-16 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: "linear-gradient(135deg,#8b5cf6, #06b6d4, #f97316)",
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 10, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-24 bottom-0 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "linear-gradient(45deg,#06b6d4, #60a5fa, #a78bfa)",
          }}
          animate={{ x: [0, -50, 20, 0], y: [0, 20, -20, 0] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-white/70 mt-1">
              Join the future — secure faster with a single step.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/80 mb-2 block">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={(e) => {
                setFormData({ ...form, email: e.target.value });
              }}
              className={`w-full rounded-xl px-4 py-3 bg-white/6 border ${
                errors.email ? "border-red-400" : "border-white/8"
              } focus:outline-none focus:ring-2 focus:ring-white/10`}
              placeholder="you@domain.com"
              autoComplete="email"
              type="email"
            />
            {errors.email && (
              <p className="text-xs text-red-300 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm text-white/80 mb-2 block">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={(e) => {
                setFormData({ ...form, password: e.target.value });
              }}
              className={`w-full rounded-xl px-4 py-3 bg-white/6 border ${
                errors.password ? "border-red-400" : "border-white/8"
              } focus:outline-none focus:ring-2 focus:ring-white/10 pr-12`}
              placeholder="Choose a strong password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-9 p-1 rounded-md"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <Eye size={18} className="text-white/80" />
              ) : (
                <EyeOff size={18} className="text-white/60" />
              )}
            </button>
            {errors.password && (
              <p className="text-xs text-red-300 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-xl py-3 font-semibold bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#fb923c] text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? "Logging In..." : "Login"}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-white/70">
          Dont have an account?{" "}
          <Link className="underline" to="/signup">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
