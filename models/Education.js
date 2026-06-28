const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },

  degree: {
    type: String,
    required: true,
  },

  fieldOfStudy: {
    type: String,
    default: "",
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  currentlyStudying: {
    type: Boolean,
    default: false,
  },

  grade: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Education", educationSchema);
