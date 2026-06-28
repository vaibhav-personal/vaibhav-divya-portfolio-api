const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    resumeUrl: {
      type: String,

      required: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
