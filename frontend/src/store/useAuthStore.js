import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/users/login", { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/users/logout");
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/users/checkAuth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
