const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const fs = require("fs");

const Resume = require("../models/Resume");

const authMiddleware = require("../middleware/authMiddleware");

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resume");
  },

  filename: function (req, file, cb) {
    cb(null, "Vaibhav_Divya_Resume.pdf");
  },
});

const upload = multer({
  storage,
});

// UPLOAD RESUME
router.post(
  "/",

  authMiddleware,

  upload.single("resume"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
        });
      }

      // FILE URL
      const resumeUrl = `${process.env.BASE_URL}/uploads/resume/Vaibhav_Divya_Resume.pdf`;

      // REMOVE OLD DATA
      await Resume.deleteMany();

      // SAVE NEW DATA
      const resume = new Resume({
        resumeUrl,
      });

      await resume.save();

      res.json({
        success: true,

        resume,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Upload failed",
      });
    }
  },
);

// GET RESUME
router.get(
  "/",

  async (req, res) => {
    try {
      const resume = await Resume.findOne().sort({
        createdAt: -1,
      });

      res.json(resume);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// DOWNLOAD RESUME
router.get(
  "/download",

  async (req, res) => {
    try {
      const filePath = path.join(
        __dirname,

        "../uploads/resume/Vaibhav_Divya_Resume.pdf",
      );

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          error: "Resume not found",
        });
      }

      res.download(
        filePath,

        "Vaibhav_Divya_Resume.pdf",
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Download failed",
      });
    }
  },
);

module.exports = router;
