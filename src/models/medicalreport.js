const mongoose = require("mongoose");

const TestResultSchema = new mongoose.Schema({
  testName: String,
  value: String,
  unit: String,
  normalRange: String,
  status: {
    type: String,
    enum: ["normal", "low", "high", "critical"],
    default: "normal",
  },
  flagged: Boolean,
});

const MedicalReportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
  dateGenerated: {
    type: Date,
    required: true,
  },
  doctorName: String,
  results: [TestResultSchema],
  summary: String,
  recommendations: String,
  aiAnalysis: {
    summary: String,
    riskLevel: String,
    suggestions: [String],
    generatedAt: Date,
  },
  fileUrl: String, // For PDF/image storage
  isDigitallySigned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MedicalReport", MedicalReportSchema);
