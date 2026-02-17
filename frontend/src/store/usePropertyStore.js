import { create } from "zustand";
import { api } from "../api/axios";

export const usePropertyStore = create((set) => ({
  properties: [],
  isLoading: false,
  error: null,

  setProperties: (properties) => set({ properties }),
  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/properties/get");
      set({ properties: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  addProperty: async (property) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/properties/create", property);
      set((state) => ({
        properties: [...state.properties, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  deleteProperty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/properties/delete/${id}`);
      set((state) => ({
        properties: state.properties.filter((property) => property._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateProperty: async (id, property) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/properties/update/${id}`, property);
      set((state) => ({
        properties: state.properties.map((property) =>
          property._id === id ? response.data : property,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
