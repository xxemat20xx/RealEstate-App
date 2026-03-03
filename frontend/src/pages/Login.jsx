import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [step, setStep] = useState("login"); // login | register | forgot | otp

  const { login, register, isLoading, verifyOTP, forgotPassword } = useAuthStore();

  
  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password); 
    if(success){
      navigate("/")
    }
    return;
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;

    await register({ name, email, password });
    setStep("otp");
    setPassword("");
    setConfirmPassword("");
    setName("");

  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const success = await verifyOTP({ email, otp }); // uses the correct email
    if (success) {
      setStep("login");
    } else {
      setOtp('');
    }
  };

  // =========================
  // FORGOT PASSWORD
  // =========================
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
  };

  const handleSubmit = (e) => {
    if (step === "login") return handleLogin(e);
    if (step === "register") return handleRegister(e);
    if (step === "otp") return handleVerifyOTP(e);
    if (step === "forgot") return handleForgotPassword(e);
  };

  const getTitle = () => {
    if (step === "login") return "Welcome Back";
    if (step === "register") return "Create Account";
    if (step === "otp") return "Verify OTP";
    if (step === "forgot") return "Reset Password";
  };

  const getButtonText = () => {
    if (step === "login") return "Sign In";
    if (step === "register") return "Create Account";
    if (step === "otp") return "Verify OTP";
    if (step === "forgot") return "Send Reset Link";
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-slate-400 hover:text-amber-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="px-10 pt-12 pb-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900">{getTitle()}</h2>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600 mt-2 font-bold">
            Luxury Property Console
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-6">

          {/* REGISTER FORM */}
          {step === "register" && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm"
                  placeholder="John Doe"
                />
              </div>

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

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete=""
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete=""
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-[38px] text-slate-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </>
          )}

          {/* OTP FORM */}
          {step === "otp" && (
            <div className="space-y-2 relative"> 
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Enter OTP
              </label>
              <input
                type={showOtp ? "text" : "password"}
                autoComplete=""
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm pr-12"
                placeholder="123456"
              />
              <button
                type="button"
                onClick={() => setShowOtp(!showOtp)}
                className="absolute right-4 top-[38px] text-slate-400"
              >
                {showOtp ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {/* LOGIN FORM */}
          {step === "login" && (
            <>
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

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete=""
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => setStep("forgot")}
                  className="text-amber-600 text-xs font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          )}
          {/* FORGOT PASSWORD FORM */}
          {step === "forgot" && (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Enter Your Email
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

              {/* Back to Login */}
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className="text-slate-500 text-xs font-semibold hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
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
            {step === "register" && (
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