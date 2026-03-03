import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from 'react-router-dom';

import { useAuthStore } from "../store/useAuthStore";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { resetPassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // RESET PASSWORD HANDLER (EMPTY)
  // =========================
  const handleResetPassword = async (e) => {
      e.preventDefault();

      if (!token) {
        console.error('Reset token missing');
        return;
      }
      try {
      await resetPassword(token, password);
      setConfirmPassword('');
      setPassword('');
      setTimeout(() => {
        navigate('/login')
      }, 1500)
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 text-slate-400 hover:text-amber-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-10 pt-12 pb-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Reset Password
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mt-2 font-bold">
            Luxury Property Console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="px-10 pb-10 space-y-6">

          {/* New Password */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-slate-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-[38px] text-slate-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs
            bg-gradient-to-r from-amber-500 to-amber-600 text-white"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;