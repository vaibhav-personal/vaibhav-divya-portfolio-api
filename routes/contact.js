const express = require("express");

const router = express.Router();

const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    const savedMessage = await newMessage.save();

    console.log("Saved Message:", savedMessage);

    res.json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    console.log("CONTACT ERROR:", error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

module.exports = router;
