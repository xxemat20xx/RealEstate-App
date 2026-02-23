import express from "express";
import {
  createInquiry,
  getInquiries,
} from "../controller/inquiry.controller.js";

const router = express.Router();

router.post("/create_inquiry", createInquiry);
router.get("/get_inquiries", getInquiries);

export default router;
