import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorize, token missing. ", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
    console.log("Error in verifying token", error);
    return res.status(500).json({
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
