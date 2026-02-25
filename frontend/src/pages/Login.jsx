import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password);
    if (login(email, password)) {
      navigate('/');
    }
    // simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 text-slate-400 hover:text-amber-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-10 pt-12 pb-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mt-2 font-bold">
            Luxury Property Console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6">

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Email Address
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm
              focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              placeholder="you@email.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm
              focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all pr-12"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-400 hover:text-amber-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 text-slate-500">
              <input type="checkbox" className="accent-amber-600" />
              Remember me
            </label>

            <button
              type="button"
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`relative w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs
            transition-all duration-300 overflow-hidden
            ${loading
              ? "bg-amber-500 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98]"
            }`}
          >
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_linear_infinite]" />
            )}

            <span className="relative text-white flex justify-center items-center gap-2">
              {loading ? "Signing In..." : "Sign In"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Or
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Create Account */}
          <button
            type="button"
            className="w-full py-4 rounded-xl border border-amber-500 text-amber-600
            font-bold uppercase tracking-widest text-xs hover:bg-amber-50 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;