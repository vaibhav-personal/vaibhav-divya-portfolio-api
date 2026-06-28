const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE EXPERIENCE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const experience = new Experience(req.body);

    await experience.save();

    res.json({
      success: true,
      experience,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// GET ALL EXPERIENCE
router.get("/", async (req, res) => {
  try {
    const experience = await Experience.find().sort({
      createdAt: -1,
    });

    res.json(experience);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// UPDATE EXPERIENCE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      },
    );

    res.json({
      success: true,
      experience: updatedExperience,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// DELETE EXPERIENCE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);

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

module.exports = router;
