import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).max(50),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const updateRoleSchema = z.object({
  role: z.enum(["user", "admin"], { required_error: "Role is required" }),
});
