import express from "express";
import {
  createInquiry,
  getInquiries,
  getMyInquiries,
  deleteAllInquiries,
} from "../controller/inquiry.controller.js";

import {
  optionalVerifyToken,
  verifyToken,
  adminOnly,
} from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create_inquiry", optionalVerifyToken, createInquiry);
router.get("/get_my_inquiries", optionalVerifyToken, getMyInquiries);

// admin access
router.get("/get_inquiries", verifyToken, adminOnly, getInquiries);
router.delete(
  "/delete_all_inquiries",
  verifyToken,
  adminOnly,
  deleteAllInquiries,
);

export default router;
