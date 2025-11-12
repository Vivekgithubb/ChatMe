import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function FuturisticSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      err.email = "Enter a valid email";
    if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Simulate backend request (replace with axios/fetch)
      await new Promise((r) => setTimeout(r, 900));
      console.log("signup payload:", form);
      alert("Signed up — demo only. Connect to backend when ready.");
      setForm({ name: "", email: "", password: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Signup failed — check console for details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#08122b] to-[#001529] p-6">
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Create account</h1>
            <p className="text-sm text-white/70 mt-1">
              Join the future — secure faster with a single step.
            </p>
          </div>
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-white/8 to-white/3 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2v6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12h14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 20h10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/80 mb-2 block">
              Full name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded-xl px-4 py-3 bg-white/6 border ${
                errors.name ? "border-red-400" : "border-white/8"
              } focus:outline-none focus:ring-2 focus:ring-white/10`}
              placeholder="Aanya Roy"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-xs text-red-300 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-white/80 mb-2 block">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
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
              onChange={handleChange}
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
              disabled={submitting}
              className="w-full rounded-xl py-3 font-semibold bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#fb923c] text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Create account"}
            </motion.button>
          </div>

          <div className="text-center text-xs text-white/60 pt-2">
            By signing up you agree to our{" "}
            <span className="underline">Terms</span> and{" "}
            <span className="underline">Privacy</span>.
          </div>
        </form>

        {/* Social options */}
        <div className="mt-6 grid grid-cols-3 items-center gap-4">
          <div className="h-px bg-white/6" />
          <div className="text-center text-xs text-white/60">
            Or continue with
          </div>
          <div className="h-px bg-white/6" />
        </div>

        <div className="mt-4 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="flex-1 rounded-xl py-2 bg-white/6 border border-white/8 text-white/90 font-medium"
          >
            Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="w-14 rounded-xl py-2 bg-white/6 border border-white/8 text-white/90 font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.27c0-.68-.06-1.16-.2-1.67H12v3.15h5.14c-.09.9-.6 2.07-1.7 2.86v2.38h2.73c1.6-1.48 2.53-3.66 2.53-6.72z"
                fill="#4285F4"
              />
            </svg>
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-white/70">
          Already have an account?{" "}
          <button className="underline">Sign in</button>
        </div>
      </motion.div>
    </div>
  );
}
