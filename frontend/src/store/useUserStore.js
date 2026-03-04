import { create } from "zustand";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const useUserStore = create((set) => ({
  users: [],
  error: null,
  isLoading: false,

  fetchAllUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/users/get"); // /users/get route
      set({ users: response.data.users, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message || "Failed to fetch users");
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/users/delete/${id}`); // match route
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        isLoading: false,
      }));
      toast.success("User deleted successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message || "Failed to delete user");
    }
  },

  updateRole: async (id, role) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/users/update/${id}/role`, { role });
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? response.data.user : user,
        ),
        isLoading: false,
      }));
      toast.success("User role updated successfully");
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error(error.message || "Failed to update role");
    }
  },
}));
