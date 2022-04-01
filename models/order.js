const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const mongooseSchema = mongoose.Schema



const opts = {
  timestamps: {
    createdAt: "dateAndTimeOfOrder",
    updatedAt: "dateAndTimeOfOrderUpdate",
  },
};

const singleOrder = new mongooseSchema({
          name: { type: String },
          description: { type: String },
          quantity: { type: String },
          orderStatus: { type: String },
          preOrder:{type:Boolean},
          amountDue: { type: Number },
          amountPaid: { type: Number },
          amountOutstanding: { type: Number },
        },
        opts)

const orderTable = new mongooseSchema({
  customerID: [
    {
      _id: mongoose.Schema.Types.Mixed,
      orderInitiator: {
        _id: mongoose.ObjectId,
      },

      itemsOrdered: [singleOrder],
    },
  ],
});



module.exports = mongoose.model("OrderTable", orderTable);