const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE SKILL
router.post("/", authMiddleware, async (req, res) => {
  try {
    const skill = new Skill(req.body);

    await skill.save();

    res.json({
      success: true,
      skill,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// GET ALL SKILLS
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({
      createdAt: -1,
    });

    res.json(skills);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// UPDATE SKILL
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      },
    );

    res.json({
      success: true,
      skill: updatedSkill,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// DELETE SKILL
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);

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
