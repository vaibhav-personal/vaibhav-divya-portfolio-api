const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    status: "online",
  });
});

module.exports = router;
