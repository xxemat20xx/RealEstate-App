import { create } from "zustand";
import { api } from "../api/axios";
import { toast } from "react-toastify";

export const useAgentStore = create((set, get) => ({
  agents: [],
  isLoading: false,
  error: null,

  getAgents: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/agents/get-agents");
      set({ agents: response.data, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  createAgent: async (agent) => {
    try {
      set({ isLoading: true });
      const response = await api.post("/agents/create-agent", agent);
      const currentAgents = get().agents; // Get the current agents from state
      set({ agents: [...currentAgents, response.data], isLoading: false });
      toast.success("Created successfully");
    } catch (error) {
      set({ error, isLoading: false });
      toast.error(error.message);
    }
  },

  updateAgent: async (id, agent) => {
    try {
      set({ isLoading: true });
      const response = await api.put(`/agents/update-agent/${id}`, agent);
      const currentAgents = get().agents; // Get the current agents from state
      set({
        agents: currentAgents.map((existingAgent) =>
          existingAgent._id === id ? response.data : existingAgent,
        ),
        isLoading: false,
      });
      toast.success("Updated successfully");
    } catch (error) {
      set({ error, isLoading: false });
      toast.error(error.message);
    }
  },

  deleteAgent: async (id) => {
    try {
      set({ isLoading: true });
      const currentAgents = get().agents; // Get the current agents from state
      const agentToDelete = currentAgents.find((agent) => agent._id === id);
      if (agentToDelete) {
        await api.delete(`/agents/delete-agent/${id}`);
        set({
          agents: currentAgents.filter((agent) => agent._id !== id),
          isLoading: false,
        });
        toast.success(`Agent ${agentToDelete.name} deleted successfully`);
      } else {
        throw new Error("Agent not found");
      }
    } catch (error) {
      set({ error, isLoading: false });
      toast.error(error.message || "Error deleting agent");
    }
  },
}));
