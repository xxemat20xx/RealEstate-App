import express from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  register,
  verifyOTP,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateRole,
} from "../controller/user.controller.js";

import { verifyToken, adminOnly } from "../middleware/verifyToken.js";

import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateRoleSchema,
} from "../schemas/auth.schema.js";

import { validate } from "../middleware/validate.middleware.js";

// limitter
import { forgotPasswordLimiter } from "../middleware/rateLimiter.js";

const userRoutes = express.Router();

userRoutes.post("/register", validate(registerSchema), register);
userRoutes.post("/login", validate(loginSchema), login);
userRoutes.post("/verify", validate(verifyOtpSchema), verifyOTP);
userRoutes.post("/logout", logout);
userRoutes.post(
  "/forgot",
  validate(forgotPasswordSchema),
  forgotPasswordLimiter,
  forgotPassword,
);
userRoutes.put("/reset/:token", validate(resetPasswordSchema), resetPassword);
userRoutes.get("/checkAuth", verifyToken, checkAuth);

//admin access
userRoutes.get("/get", verifyToken, adminOnly, getAllUsers);
userRoutes.delete("/delete/:id", verifyToken, adminOnly, deleteUser);
userRoutes.get("/admin", verifyToken, adminOnly, getAllUsers);
userRoutes.put(
  "/update/:id/role",
  verifyToken,
  adminOnly,
  validate(updateRole),
  updateRole,
);

export default userRoutes;
