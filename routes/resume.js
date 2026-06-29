const express = require("express");

const router = express.Router();

const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const Resume = require("../models/Resume");

const authMiddleware = require("../middleware/authMiddleware");

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,

  api_key: process.env.CLOUD_API_KEY,

  api_secret: process.env.CLOUD_API_SECRET,
});

// CLOUDINARY STORAGE
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "portfolio-resume",

    resource_type: "raw",

    public_id: "Vaibhav_Divya_Resume",
  }),
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

      // CLOUDINARY FILE URL
      const resumeUrl = req.file.path;

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
router.get("/", async (req, res) => {
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
});

// DOWNLOAD RESUME
router.get("/download", async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        error: "Resume not found",
      });
    }

    res.json({
      downloadUrl: resume.resumeUrl,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Download failed",
    });
  }
});

module.exports = router;
