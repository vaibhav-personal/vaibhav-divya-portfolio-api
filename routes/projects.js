const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../config/multer");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post(
  "/",

  authMiddleware,

  upload.single("image"),

  async (req, res) => {
    try {
      const project = new Project({
        title: req.body.title,

        description: JSON.parse(req.body.description),

        techStack: req.body.techStack,

        github: req.body.github,

        liveDemo: req.body.liveDemo,

        image: req.file ? req.file.path : "",
      });

      await project.save();

      res.json({
        success: true,

        project,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// GET ALL PROJECTS
router.get(
  "/",

  async (req, res) => {
    try {
      const projects = await Project.find()

        .sort({
          createdAt: -1,
        });

      res.json(projects);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// DELETE PROJECT
router.delete(
  "/:id",

  authMiddleware,

  async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);

      res.json({
        success: true,

        message: "Project deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// UPDATE PROJECT
router.put(
  "/:id",

  authMiddleware,

  upload.single("image"),

  async (req, res) => {
    try {
      const existingProject = await Project.findById(req.params.id);

      if (!existingProject) {
        return res.status(404).json({
          error: "Project not found",
        });
      }

      const updatedData = {
        title: req.body.title,

        description: JSON.parse(req.body.description),

        techStack: req.body.techStack,

        github: req.body.github,

        liveDemo: req.body.liveDemo,

        image: req.file ? req.file.path : existingProject.image,
      };

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,

        updatedData,

        {
          returnDocument: "after",
        },
      );

      res.json({
        success: true,

        project: updatedProject,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

module.exports = router;
