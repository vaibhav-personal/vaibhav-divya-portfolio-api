const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Hero = require("../models/Hero");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

// UPLOAD HERO IMAGE
router.post(
  "/",
  authMiddleware,
  upload.single("image"),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: "No image uploaded",
        });
      }

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

        {
          folder: "portfolio-hero",
        },
      );

      await Hero.deleteMany();

      const hero = new Hero({
        image: result.secure_url,
      });

      await hero.save();

      res.json({
        success: true,

        hero,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// GET HERO IMAGE
router.get(
  "/",

  async (req, res) => {
    try {
      const hero = await Hero.findOne().sort({
        createdAt: -1,
      });

      res.json(hero);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

module.exports = router;
