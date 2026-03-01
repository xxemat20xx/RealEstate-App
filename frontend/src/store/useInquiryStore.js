import { create } from "zustand";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const useInquiryStore = create((set) => ({
  inquiries: [],
  loading: false, // Add loading state
  setInquiries: (inquiries) => set({ inquiries }),
  setLoading: (loading) => set({ loading }),

  createInquiry: async (inquiry) => {
    set({ loading: true });
    try {
      const response = await api.post("/inquiries/create_inquiry", inquiry);

      set((state) => ({
        inquiries: [...state.inquiries, response.data],
      }));
      toast.success("Created successfully");

      return { success: true };
    } catch (error) {
      console.error("Error creating inquiry:", error);
      toast.error(error.message);

      return {
        success: false,
        message: error.response?.data?.message || "Failed to create inquiry",
      };
    } finally {
      set({ loading: false }); // Stop loading when the API call finishes
    }
  },

  getInquiries: async () => {
    try {
      const response = await api.get("/inquiries/get_inquiries");
      set({ inquiries: response.data });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error(error.message);
    }
  },
}));
