import express from "express";
import {
  createInquiry,
  getInquiries,
  getMyInquiries,
  deleteAllInquiries,
} from "../controller/inquiry.controller.js";

import { optionalVerifyToken, verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/create_inquiry", optionalVerifyToken, createInquiry);
router.get("/get_my_inquiries", optionalVerifyToken, getMyInquiries);

router.get("/get_inquiries", verifyToken, getInquiries);
router.delete("/delete_all_inquiries", verifyToken, deleteAllInquiries);

export default router;
