const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema


const VendorTable = new mongooseSchema(
  {
    businessName: { type: String, required: true, unique: true },
    email: { unique: true, required: true, type: String },
    PhoneNumber: { unique: true, required: true, type: String },
    password: { unique: true, type: String }
  },
  { timestamps: true }
);


module.exports = mongoose.model("VendorTable", VendorTable);



