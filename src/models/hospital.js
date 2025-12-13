const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  description: String,
});

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: String,
});

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  contact: {
    phone: String,
    email: String,
    emergency: String,
  },
  departments: [DepartmentSchema],
  tests: [TestSchema],
  qrCode: {
    type: String,
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
  },
  floorPlan: {
    type: String,
    default: null,
  },

  amenities: [String],
  ratings: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", HospitalSchema);
