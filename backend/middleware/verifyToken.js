import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  console.log("Token from cookie:", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, token missing",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifying token", error);

    return res.status(401).json({
      success: false,
      message: "Unauthorized, invalid token",
    });
  }
};

export const adminOnly = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log("Error in verifying token", error);
    return res.status(500).json({
      success: false,
      message: "Unauthorized, invalid token",
    });
  }
};

// ✅ Optional user middleware
export const optionalVerifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    // No token? Proceed as guest
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("_id name email");
    if (user) {
      req.userId = user._id; // attach userId to request
      req.user = user; // optionally attach full user
    }
    next();
  } catch (error) {
    console.log("Error verifying optional token:", error);
    // Still allow request to continue as guest
    next();
  }
};
