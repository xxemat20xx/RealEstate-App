import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name too short"],
      maxlength: [50, "Name too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // 🔥 prevents duplicates at DB level
      lowercase: true, // 🔥 normalize
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 chars"],
      select: false, // 🔥 NEVER return password by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      immutable: true, // 🔥 prevents role change via update
    },

    avatar: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          return !v || validator.isURL(v);
        },
        message: "Invalid avatar URL",
      },
    },

    refreshToken: {
      type: [String],
      default: [],
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      select: false, // 🔥 sensitive
    },

    otpExpiry: {
      type: Date,
      select: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetTokenExpiry: {
      type: Date,
      select: false,
    },
    passwordResetAttempts: {
      count: { type: Number, default: 0 },
      lastAttempt: { type: Date, default: null },
    },
  },
  { timestamps: true },
);

userSchema.path("email").validate((value) => {
  return typeof value === "string";
}, "Invalid email type");

// compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
