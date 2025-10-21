import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password)
      return res.status(400).json({ message: "Please enter all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Passwords must have atleast 6 characters" });

    //check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "email is wrong format" });

    const user = await User.findOne({ email });
    if (user) return res.status(404).json({ message: "Email already exists" });

    //encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      fullname: fullname,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(200).json({
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        profilePics: savedUser.profilePics,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullname,
          ENV.CLIENT_URL
        );
      } catch (err) {
        console.log("Failed to send Email ", err);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signUp Controller", err);
    res
      .status(500)
      .json({ message: "Something went wron, Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilePics: user.profilePics,
    });
  } catch (err) {
    console.log("Error logging in", err);
    res.status(400).json({ message: "Couldnt login" });
  }
};
export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: " logout succesfull" });
};
