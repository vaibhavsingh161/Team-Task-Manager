import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 SIGNUP
export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // 🔍 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      msg: "User created",
    });

  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};

// 🔐 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,   // ✅ IMPORTANT (frontend needs this)
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};