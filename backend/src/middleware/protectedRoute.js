import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ message: " Your are unauthorised" });

    const decoded = jwt.verify(token, ENV.SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ message: " Your are unauthorised - invalid token" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "No User found" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
