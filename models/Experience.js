const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
  },

  currentlyWorking: {
    type: Boolean,
    default: false,
  },

  location: {
    type: String,
    default: "",
  },

  points: [{ type: String }],

  technologies: {
    type: [String],
    default: [],
  },

  logo: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
