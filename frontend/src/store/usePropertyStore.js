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
  addProperty: async (propertyData) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();

      // Append normal fields
      Object.keys(propertyData).forEach((key) => {
        if (key !== "images") {
          if (Array.isArray(propertyData[key])) {
            propertyData[key].forEach((item) => formData.append(key, item)); // handle arrays like amenities
          } else {
            formData.append(key, propertyData[key]);
          }
        }
      });

      // Append images
      if (propertyData.images) {
        propertyData.images.forEach((img) => {
          if (img.file instanceof File) {
            formData.append("images", img.file);
          }
        });
      }

      // POST to backend
      const response = await api.post("/properties/create", formData);

      // Update state
      set((state) => ({
        properties: [...state.properties, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error; // re-throw so your AdminPanel onSave can catch it
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
  updateProperty: async (id, propertyData, deletedImageIds) => {
    set({ isLoading: true, error: null });

    try {
      const formData = new FormData();

      // append normal fields
      Object.keys(propertyData).forEach((key) => {
        if (key !== "images") {
          if (Array.isArray(propertyData[key])) {
            propertyData[key].forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, propertyData[key]);
          }
        }
      });

      // append new images only
      propertyData.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      // ✅ append deleted image IDs properly
      deletedImageIds.forEach((id) => {
        formData.append("deletedImageIds", id);
      });

      const response = await api.put(`/properties/update/${id}`, formData);

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
