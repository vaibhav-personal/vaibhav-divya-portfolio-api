const express = require("express");

const router = express.Router();

const Message = require("../models/Message");

const authMiddleware = require("../middleware/authMiddleware");

const { Resend } = require("resend");

// EMAIL TRANSPORTER
const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE MESSAGE
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // SAVE TO DATABASE
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    // SEND EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev",

      to: "vaibhav.divya2202@gmail.com",

      subject: `New Portfolio Message from ${name}`,

      html: `
    <h2>New Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong> ${message}</p>
  `,
    });

    res.json({
      success: true,

      message: "Message Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// GET ALL MESSAGES
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error",
    });
  }
});

// DELETE MESSAGE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

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
