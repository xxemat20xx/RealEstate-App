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

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/verify", verifyOTP);
userRoutes.post("/forgot", forgotPassword);
userRoutes.put("/reset/:token", resetPassword);
userRoutes.get("/checkAuth", verifyToken, checkAuth);

//admin access
userRoutes.get("/get", verifyToken, adminOnly, getAllUsers);
userRoutes.delete("/delete/:id", verifyToken, adminOnly, deleteUser);
userRoutes.get("/admin", verifyToken, adminOnly, getAllUsers);
userRoutes.put("/update/:id/role", verifyToken, adminOnly, updateRole);

export default userRoutes;
