const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const opts = {
  timestamps: {
    createdAt: "dateTimeCreated",
    updatedAt: "dateTimeUpdated",
  },
};

const customerTable = new mongooseSchema(
  {
    firstName: { type: String, required: true, unique: true },
    lastName: { unique: true, required: true, type: String },
    email: { unique: true, required: true, type: String },
    phoneNumber: { unique: true, type: String },
    role: { type: String, required: true },
  },
opts);

module.exports = mongoose.model("customerTable", customerTable);
