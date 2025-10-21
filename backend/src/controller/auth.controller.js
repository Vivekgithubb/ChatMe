import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
