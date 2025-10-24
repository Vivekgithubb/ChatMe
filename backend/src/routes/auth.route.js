import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateprofile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
