import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login"); // login | register | forgot

  const { login } = useAuthStore();

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate("/");
    }

    setLoading(false);
  };

  // =========================
  // REGISTER (EMPTY HANDLER)
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register clicked");
  };

  // =========================
  // FORGOT PASSWORD (EMPTY HANDLER)
  // =========================
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Forgot password clicked");
  };

  // =========================
  // Dynamic Submit Handler
  // =========================
  const handleSubmit = (e) => {
    if (step === "login") return handleLogin(e);
    if (step === "register") return handleRegister(e);
    if (step === "forgot") return handleForgotPassword(e);
  };

  const getTitle = () => {
    if (step === "login") return "Welcome Back";
    if (step === "register") return "Create Account";
    if (step === "forgot") return "Reset Password";
  };

  const getButtonText = () => {
    if (step === "login") return "Sign In";
    if (step === "register") return "Create Account";
    if (step === "forgot") return "Send Reset Link";
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
            {getTitle()}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm"
              placeholder="you@email.com"
            />
          </div>

          {/* Password (Hidden in Forgot) */}
          {step !== "forgot" && (
            <div className="space-y-2 relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Password
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
          )}

          {/* Confirm Password (Register Only) */}
          {step === "register" && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm"
                placeholder="••••••••"
              />
            </div>
          )}

          {/* Forgot Password Link (Login Only) */}
          {step === "login" && (
            <div className="flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => setStep("forgot")}
                className="text-amber-600 font-semibold"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs
            bg-gradient-to-r from-amber-500 to-amber-600 text-white"
          >
            {getButtonText()}
          </button>

          {/* Bottom Switch Buttons */}
          <div className="text-center text-xs pt-4 space-y-2">

            {step === "login" && (
              <button
                type="button"
                onClick={() => setStep("register")}
                className="text-amber-600 font-semibold"
              >
                Create Account
              </button>
            )}

            {step !== "login" && (
              <button
                type="button"
                onClick={() => setStep("login")}
                className="text-slate-500 font-semibold"
              >
                Back to Login
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;