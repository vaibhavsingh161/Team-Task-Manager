import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: [req.user.id], // creator is member
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ msg: "Error creating project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};