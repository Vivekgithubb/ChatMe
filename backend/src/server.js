import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
dotenv.config({ path: "src/.env" });
const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

console.log(PORT);
app.listen(PORT, () => {
  console.log("Running at 3000");
});
