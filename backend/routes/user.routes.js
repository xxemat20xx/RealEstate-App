import express from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  register,
} from "../controller/user.controller.js";

import { verifyToken, adminOnly } from "../middleware/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.get("/get", getAllUsers);
userRoutes.get("/checkAuth", verifyToken, checkAuth);
userRoutes.get("/admin", verifyToken, adminOnly, getAllUsers);

export default userRoutes;
