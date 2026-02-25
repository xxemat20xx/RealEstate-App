import { Agent } from "../models/agent.model.js";

export const createAgent = async (req, res) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAgentInfo = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
