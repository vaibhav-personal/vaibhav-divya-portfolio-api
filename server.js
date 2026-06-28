require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const analyticsRoutes = require("./routes/analytics");
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const experienceRoutes = require("./routes/experience");
const educationRoutes = require("./routes/education");
const certificationRoutes = require("./routes/certifications");
const messageRoutes = require("./routes/messages");
const chatRoutes = require("./routes/chat");
const resumeRoutes = require("./routes/resume");
const heroRoutes = require("./routes/hero");
const systemStatusRoutes = require("./routes/systemStatus");
const healthRoutes = require("./routes/health");

const app = express();

// DATABASE CONNECTION
connectDB();

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL],

    credentials: true,
  }),
);

app.use(express.json());

app.use( "/uploads", express.static( path.join(__dirname, "uploads") ) );

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Portfolio API Running 🚀");
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/system-status", systemStatusRoutes);
app.use("/api/health", healthRoutes);

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
