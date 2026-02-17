import express from "express";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  getProperties,
  getProperty,
} from "../controller/property.controller.js";
import { upload } from "../middleware/multer.js";

// import { verifyToken, adminOnly } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/create", upload.array("images"), createProperty);
router.delete("/delete/:id", deleteProperty);
router.put("/update/:id", upload.array("images"), updateProperty);
router.get("/get", getProperties);
router.get("/get/:id", getProperty);

export default router;
