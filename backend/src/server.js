import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: "src/.env" });
const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();

app.use(express.json());
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

app.listen(PORT, () => {
  console.log("Running at ", PORT);
  console.log("Mongo URI:", process.env.MONGO_URI);
  connectDB();
});
