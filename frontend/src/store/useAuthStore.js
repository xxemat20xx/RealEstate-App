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
      const message = error?.response?.data?.message;
      error?.message || "Login failed";

      set({
        error: message,
        isLoading: false,
      });
      toast.error(message);
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
}));
