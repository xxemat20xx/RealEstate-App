import { User } from "../models/user.model.js";

import { sendEmail } from "../utils/emails.js";

import { cookieOptions } from "../utils/cookie.js";
import { hashToken } from "../utils/hashToken.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import {
  otpEmailTemplate,
  resetPasswordEmailTemplate,
} from "../utils/template.js";

import crypto from "crypto";

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const register = async (req, res) => {
  const { email, password, name, role } = req.validatedData;
  try {
    if (password.length < 6)
      return res
        .status(401)
        .json({ message: "Password must be at least 6 character" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; //10mins

    const hashedOtp = hashToken(otp);

    const newUser = new User({
      name,
      email,
      role: role || "user",
      password,
      otp: hashedOtp,
      otpExpiry,
    });
    await newUser.save();

    // sending email verification
    await sendEmail(
      email,
      "Verify your email",
      otpEmailTemplate({ name, otp }),
    );

    res
      .status(201)
      .json({ message: "User registered. OTP was sent to email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "User is not verified" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //single refresh token
    user.refreshToken = [refreshToken];
    await user.save();

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const logout = async (req, res) => {
  const token = req.cookies.refreshToken; // ✅ fixed

  try {
    if (token) {
      await User.updateOne(
        { refreshToken: token },
        { $pull: { refreshToken: token } },
      );
    }

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.validatedData;
  try {
    const MAX_ATTEMPTS = 5;

    const user = await User.findOne({ email });
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP expired" });
    }
    // Check if max attempts reached
    if (user.otpAttempts >= MAX_ATTEMPTS) {
      return res.status(429).json({
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    const hashedOtp = hashToken(otp);

    if (hashedOtp !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    await user.save();

    res.status(200).json({ message: "Email verified successfully ✅" });
  } catch (error) {
    console.error(error);
  }
};
export const forgotPassword = async (req, res) => {
  const email = req.validatedData?.email.toLowerCase().trim();
  const responseMessage = {
    msg: "If this email exists, a password reset link has been sent",
  };

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json(responseMessage);

    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    // Reset count if last attempt was > 1 hour ago
    if (
      !user.passwordResetAttempts ||
      user.passwordResetAttempts.lastAttempt < oneHourAgo
    ) {
      user.passwordResetAttempts = { count: 0, lastAttempt: null };
    }

    if (user.passwordResetAttempts.count >= 5) {
      return res
        .status(429)
        .json({ message: "Too many password reset requests, try again later" });
    }

    // Increment attempt
    user.passwordResetAttempts.count += 1;
    user.passwordResetAttempts.lastAttempt = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = now + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset/${resetToken}`;
    await sendEmail(
      email,
      "Reset Password",
      resetPasswordEmailTemplate({ name: user.name, resetUrl }),
    );

    return res.json(responseMessage);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // ✅ Use validatedData instead of req.body
    const { newPassword } = req.validatedData;
    user.password = newPassword;

    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User record deleted successfully.",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.validatedData;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User role updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Role Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
