import { create } from "zustand";
import { api } from "../api/axios";

export const useInquiryStore = create((set) => ({
  inquiries: [],
  setInquiries: (inquiries) => set({ inquiries }),

  createInquiry: async (inquiry) => {
    try {
      const response = await api.post("/inquiries/create_inquiry", inquiry);

      set((state) => ({
        inquiries: [...state.inquiries, response.data],
      }));

      return { success: true };
    } catch (error) {
      console.error("Error creating inquiry:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create inquiry",
      };
    }
  },

  getInquiries: async () => {
    try {
      const response = await api.get("/inquiries/get_inquiries");
      set({ inquiries: response.data });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  },
}));
