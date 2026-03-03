import { create } from "zustand";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  isLoading: false,
  error: null,
  message: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email, password) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await api.post("/users/login", { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success("Login successful");
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";

      set({
        error: message,
        isLoading: false,
      });

      toast.error(message);
      return false;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      await api.post("/users/logout");

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      toast.success("Logout successful");

      return true;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Logout failed";

      set({
        error: message,
        isLoading: false,
      });

      toast.error(message);

      return false;
    }
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null, isCheckingAuth: true });
    try {
      const response = await api.get("/users/checkAuth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: false,
      });
    }
  },
  register: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });
      set({
        isLoading: false,
      });
      toast.success(
        "Registration successful, OTP was sent to your registered email",
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error signing up.");
      set({ isLoading: false });
      throw error;
    }
  },
  verifyOTP: async ({ email, otp }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("users/verify", { email, otp });
      toast.success(res.data.message || "Email verified successfully ✅");
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Invalid or expired OTP";
      set({ error: message });
      toast.error(message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  forgotPassword: async ({ email }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/users/forgot", { email });
      set({ user: response.data.user, isLoading: false });
      toast.success("Link was sent to your email address.");
    } catch (error) {
      set({ isLoading: false });
      toast.error("User not found.");
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/users/reset/${token}`, { newPassword });
      toast.success("Password updated.");
      set({ isLoading: false, message: res.data.message });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Something went wrong",
      });
      toast.error("Something went wrong.");
      throw new Error(error);
    }
  },
}));
