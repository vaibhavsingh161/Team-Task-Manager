import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin creates project
router.post("/", protect, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied (Admin only)" });
  }
  next();
}, createProject);

// All users can view their projects
router.get("/", protect, getProjects);

export default router;