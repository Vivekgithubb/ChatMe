import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

export default cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUDNAME,
  api_key: ENV.CLOUDINARY_API,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});
