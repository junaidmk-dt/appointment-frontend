import { useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toastify import
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.ok) {
      toast.error(res.error || "Login failed"); // ✅ Toastify error
    } else {
      toast.success("Logged in successfully!"); // ✅ Toastify success
      navigate("/categories"); // Navigate after successful login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 
          p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col animate-fadeIn
        "
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 rounded-lg bg-white/70 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
