import express from "express";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  getProperties,
  getProperty,
} from "../controller/property.controller.js";
import { upload } from "../middleware/multer.js";

import { verifyToken, adminOnly } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get", getProperties);
router.get("/get/:id", getProperty);

router.post(
  "/create",
  verifyToken,
  adminOnly,
  upload.array("images"),
  createProperty,
);
router.delete("/delete/:id", verifyToken, adminOnly, deleteProperty);
router.put(
  "/update/:id",
  verifyToken,
  adminOnly,
  upload.array("images"),
  updateProperty,
);

export default router;
