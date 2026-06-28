const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

// ADMIN EMAIL WHITELIST
const allowedAdmins = ["vaibhav.divya2202@gmail.com"];

// LOGIN
router.post(
  "/login",

  async (req, res) => {
    try {
      const { email, password } = req.body;

      // WHITELIST CHECK
      if (!allowedAdmins.includes(email)) {
        return res.status(403).json({
          error: "Unauthorized Admin",
        });
      }

      // FIND ADMIN
      const admin = await Admin.findOne({
        email,
      });

      if (!admin) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }

      // PASSWORD CHECK
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({
          error: "Invalid Credentials",
        });
      }

      // ACCESS TOKEN
      const accessToken = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1h",
        },
      );

      // REFRESH TOKEN
      const refreshToken = jwt.sign(
        {
          id: admin._id,
        },

        process.env.JWT_REFRESH_SECRET,

        {
          expiresIn: "7d",
        },
      );

      // SAVE REFRESH TOKEN
      admin.refreshToken = refreshToken;

      await admin.save();

      res.json({
        success: true,

        accessToken,

        refreshToken,

        admin: {
          id: admin._id,

          name: admin.name,

          email: admin.email,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Server Error",
      });
    }
  },
);

// REFRESH TOKEN
router.post(
  "/refresh-token",

  async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          error: "Refresh Token Missing",
        });
      }

      const decoded = jwt.verify(
        refreshToken,

        process.env.JWT_REFRESH_SECRET,
      );

      const admin = await Admin.findById(decoded.id);

      if (!admin || admin.refreshToken !== refreshToken) {
        return res.status(403).json({
          error: "Invalid Refresh Token",
        });
      }

      const newAccessToken = jwt.sign(
        {
          id: admin._id,
          email: admin.email,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1h",
        },
      );

      res.json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.log(error);

      res.status(403).json({
        error: "Invalid Refresh Token",
      });
    }
  },
);

module.exports = router;
