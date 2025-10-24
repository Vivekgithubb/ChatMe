import dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URI,
  MONO_USERNAME: process.env.MONGO_USERNAME,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
  CLOUDINARY_API: process.env.CLOUDINARY_API,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
};
