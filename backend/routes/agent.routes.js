import express from "express";
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgentInfo,
} from "../controller/agent.controller.js";

const router = express.Router();

router.post("/create-agent", createAgent);
router.get("/get-agents", getAgents);
router.delete("/delete-agent/:id", deleteAgent);
router.put("/update-agent/:id", updateAgentInfo);

export default router;
