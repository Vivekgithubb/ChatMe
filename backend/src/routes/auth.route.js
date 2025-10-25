import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/protectedRoute.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const router = express.Router();

router.get("/test", arcjetProtection, (req, res) => {
  res.status(200).json({ message: "testRoute" });
});

// router.use(arcjetProtection); //runs first then all others run only if its succesfull
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateprofile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
