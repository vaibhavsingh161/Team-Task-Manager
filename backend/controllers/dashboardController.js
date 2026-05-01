// backend/controllers/dashboardController.js

import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status !== "done").length;

  res.json({ total, completed, pending });
};