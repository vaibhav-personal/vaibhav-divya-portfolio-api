const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const certification = new Certification(req.body);

    await certification.save();

    res.json({
      success: true,
      certification,
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
    const certifications = await Certification.find().sort({
      issueDate: -1,
    });

    res.json(certifications);
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
    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      },
    );

    res.json({
      success: true,
      certification: updated,
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
    await Certification.findByIdAndDelete(req.params.id);

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
