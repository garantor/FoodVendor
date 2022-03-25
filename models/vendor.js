const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const mongooseSchema = mongoose.Schema


const VendorTable = new mongooseSchema(
  {
    businessName: { type: String, required: true, unique: true },
    email: { unique: true, required: true, type: String },
    PhoneNumber: { unique: true, required: true, type: String },
    password: { unique: true, type: String },
    role:{type:String, required:true}
  },
  { timestamps: true }
);


module.exports = mongoose.model("VendorTable", VendorTable);



