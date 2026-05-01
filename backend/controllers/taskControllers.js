import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { title, description, projectId, assignedTo, deadline } = req.body;

    const tasks = await Task.find()

    // ✅ validation
    if (!title || !projectId) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    // ✅ create task safely
    const task = await Task.create({
      title,
      description,
      projectId,
      assignedTo: assignedTo || req.user.id,
      deadline:deadline || null,
      createdBy: req.user?.id,
      status: "todo"
    });

    res.status(201).json(task);

  } catch (error) {
    console.log("ERROR:", error.message); // 👈 THIS WILL SHOW REAL ISSUE
    res.status(500).json({ msg: error.message });
  }
};
// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ assignedTo: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching tasks" });
//   }
// };
// const tasks = await Task.find({ assignedTo: req.user.id })
//   .populate("projectId", "name")
//   .populate("assignedTo", "username");

export const getTasks = async (req, res) => {
  try {
    console.log("USER:", req.user);

    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id }
      ]
    })
      .populate("projectId", "name")
      .populate("assignedTo", "username");

    console.log("FILTERED TASKS:", tasks);

    res.json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
