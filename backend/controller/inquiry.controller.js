import { Inquiry } from "../models/inquiry.model.js";
import axios from "axios";
import { sendEmail } from "../utils/emails.js";
import { inquiryTemplate } from "../utils/template.js";
import { Property } from "../models/property.model.js";

export const createInquiry = async (req, res) => {
  try {
    const { recaptchaToken, propertyId, ...inquiryData } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ message: "Recaptcha token is required" });
    }

    // ✅ Verify Recaptcha
    const verifyResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      },
    );

    if (!verifyResponse.data.success) {
      return res.status(400).json({ message: "Recaptcha verification failed" });
    }

    // ✅ Find property first
    const property = await Property.findById(propertyId).populate("agent");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!property.agent) {
      return res
        .status(404)
        .json({ message: "Agent not found for this property" });
    }

    // ✅ Create inquiry (attach user if logged in)
    const inquiry = await Inquiry.create({
      ...inquiryData,
      propertyId,
      propertyTitle: property.title,
      user: req.user?._id || undefined,
    });

    // ✅ Send email to agent
    await sendEmail(
      property.agent.email,
      `New Inquiry for ${property.title}`,
      inquiryTemplate({ inquiry, property }),
    );

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("user", "name email role") // Populate user with name, email, role
      .populate("propertyId", "title address"); // optional: populate property info

    res.status(200).json(inquiries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyInquiries = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const inquiries = await Inquiry.find({ user: req.user._id })
      .populate("user", "name email role")
      .populate("propertyId", "title address");

    res.status(200).json(inquiries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAllInquiries = async (req, res) => {
  try {
    await Inquiry.deleteMany();
    res.status(200).json({ message: "All inquiries deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
