import express from "express";

import {
  signUp,
  signIn,
  verifyToken,
  getUser,
  refreshToken,
} from "../../controller/auth/authController.js";

const router = express.Router();

router.post("/auth/signup", signUp);
router.post("/auth/signin", signIn);
router.get("/admin/dashboard", verifyToken, getUser);
router.get("/admin/refresh", refreshToken,verifyToken,getUser);
// verivy token

export default router;
