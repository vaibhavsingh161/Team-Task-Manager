import express from "express";
import { createTask,  updateTaskStatus } from "../controllers/taskControllers.js";
import { getTasks } from "../controllers/taskControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getTasks);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTaskStatus);

export default router;