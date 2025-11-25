import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    //extract token from http only cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connectin rejected : No token provided");
      return next(new Error("Unauthorised"));
    }
    const decoded = jwt.verify(token, ENV.SECRET);
    if (!decoded) return next(new Error("Couldnt verify your token"));

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected:No user found");
      return next(new Error("No User found"));
    }
    //attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();
    console.log("Socket connection Acceped");
    next();
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};
