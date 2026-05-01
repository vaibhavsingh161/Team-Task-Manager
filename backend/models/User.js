// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "user"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);