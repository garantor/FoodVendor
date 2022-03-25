const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const MenuTable = new mongooseSchema(
  {
    name: { type: String, required: true, unique:false },
    description: { required: true, type: String, unique:false},
    price: { required: true, type: String, unique:false },
    quantity: { type: String, required:true, unique:false},
    vendorID: { type: mongoose.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuTable", MenuTable);
