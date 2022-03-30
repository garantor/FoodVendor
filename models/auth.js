const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const opts = {
  timestamps: {
    createdAt: "dateTimeCreated",
    updatedAt: "dateTimeUpdated",
  },
};

const AuthTable = new mongooseSchema(
  {
    email: { type: String, required: true, unique: true },
    password: { unique: true, required: true, type: String },
    role: { type: String, required: true },
  },
  opts
);


module.exports = mongoose.model("authtable", AuthTable);
