import express from "express";
import {
  createProperty,
  deleteProperty,
} from "../controller/property.controller.js";

const router = express.Router();

router.post("/create", createProperty);
router.delete("/delete/:id", deleteProperty);
// router.put("/update");
// router.get("/get");
// router.get("/get/:id");

export default router;
