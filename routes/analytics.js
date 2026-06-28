const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const Message = require("../models/Message");

const Skill = require("../models/Skill");

const Experience = require("../models/Experience");

const Certification = require("../models/Certification");

const Visitor = require("../models/Visitor");

// RESUME DOWNLOADS
let resumeDownloads = 0;

router.post("/resume-download", (req, res) => {
  resumeDownloads++;

  console.log(`Resume Downloads: ${resumeDownloads}`);

  res.json({
    success: true,

    totalDownloads: resumeDownloads,
  });
});

// TRACK VISITORS
router.post("/track-visitor", async (req, res) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"];

    const visitor = new Visitor({
      ip,
    });

    await visitor.save();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// DASHBOARD STATS
router.get("/dashboard", async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();

    const totalMessages = await Message.countDocuments();

    const totalSkills = await Skill.countDocuments();

    const totalExperience = await Experience.countDocuments();

    const totalCertifications = await Certification.countDocuments();

    const totalVisitors = await Visitor.countDocuments();

    res.json({
      totalProjects,
      totalMessages,
      totalSkills,
      totalExperience,
      totalCertifications,
      totalVisitors,
      resumeDownloads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

module.exports = router;
