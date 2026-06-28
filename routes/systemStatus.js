const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

// SYSTEM STATUS
router.get(
  "/",

  async (req, res) => {
    try {
      // API STATUS
      const backendAPI = "Online";

      // DATABASE STATUS
      const mongoStatus =
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

      // AUTH STATUS
      const authStatus = process.env.JWT_SECRET ? "Active" : "Inactive";

      res.json({
        backendAPI,

        mongoStatus,

        authStatus,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "System status failed",
      });
    }
  },
);

module.exports = router;
