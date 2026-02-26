import { Inquiry } from "../models/inquiry.model.js";
import axios from "axios";
import { sendEmail } from "../utils/emails.js";
import { inquiryTemplate } from "../utils/template.js";
import { Property } from "../models/property.model.js";

export const createInquiry = async (req, res) => {
  try {
    const { recaptchaToken, ...inquiryData } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ message: "Recaptcha token is required" });
    }

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

    const inquiry = await Inquiry.create(inquiryData);

    // 🔥 Fetch property WITH agent
    const property = await Property.findById(inquiry.propertyId).populate(
      "agent",
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!property.agent) {
      return res
        .status(404)
        .json({ message: "Agent not found for this property" });
    }

    // ✅ Send inquiry to AGENT (not client)
    await sendEmail(
      property.agent.email, // 🔥 changed here
      `New Inquiry for ${property.title}`,
      inquiryTemplate({ inquiry, property }),
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
