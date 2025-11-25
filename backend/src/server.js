import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { app, server } from "./socket.js";

dotenv.config({ path: "src/.env" });
const PORT = ENV.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., "http://localhost:3000"
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

//make ready for deployement
if (process.env.NODE_ENV === "production") {
  //getting dist from frontend to use static asset
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //for react application
  app.get("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Running at ", PORT);
  connectDB();
});
