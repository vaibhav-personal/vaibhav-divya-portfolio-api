const express = require("express");
const router = express.Router();
const Education = require("../models/Education");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const education = new Education(req.body);

    await education.save();

    res.json({
      success: true,
      education,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const education = await Education.find().sort({
      startDate: -1,
    });

    res.json(education);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      },
    );

    res.json({
      success: true,
      education: updatedEducation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);

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
