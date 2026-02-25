import { create } from "zustand";
import { api } from "../api/axios";

export const useAgentStore = create((set) => ({
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
      set({ agents: [...agents, response.data], isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  updateAgent: async (id, agent) => {
    try {
      set({ isLoading: true });
      const response = await api.put(`/agents/update-agent/${id}`, agent);
      set({
        agents: agents.map((agent) =>
          agent.id === id ? response.data : agent,
        ),
        isLoading: false,
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  deleteAgent: async (id) => {
    try {
      set({ isLoading: true });
      await api.delete(`/agents/delete-agent/${id}`);
      set({
        agents: agents.filter((agent) => agent.id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
