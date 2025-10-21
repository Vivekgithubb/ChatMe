import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { SECRET } = process.env;
  if (!SECRET) throw new Error("SECRET not set");
  const token = jwt.sign({ userId: userId }, process.env.SECRET, {
    expiresIn: 86400 * 7,
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent xss attack:Cross site aattacks
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};
