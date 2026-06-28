const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  organization: {
    type: String,
    required: true,
  },

  issueYear: { type: String, required: true },

  credentialUrl: {
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

module.exports = mongoose.model("Certification", certificationSchema);
