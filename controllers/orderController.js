const ORDER = require("../models/order");
const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyJwt");
const mongoose = require('mongoose')


async function orderList(req, resp){
    try{
        const orderList = await ORDER.find();
        if(orderList.length === 0){
            resp.status(200).json({
                message:"Order List is Empty"
            })
        }else{
            resp.status(200).json(orderList);
        }
    } catch(err){
        resp.status(400).json(err)
    }
   
};
// need to add date and time
async function createOrder(req, resp){
    // We should get UserId from the header through JWt not trusting our API to send the correct id
    // amountDue and amount Outstanding should be construct server side not trusting API
   
    const customerID = req.body.customerID
    const orderInitiator = req.body.orderInitiator // this is the vendor, it should br fetch from the jwt 
    const description = req.body.description
    const amountDue = req.body.amountDue
    const amountPaid = req.body.amountPaid
    const amountOutstanding = amountDue - amountPaid;
    const itemName = req.body.itemName;
    const quantity = req.body.quantity;
    //Explicitly checking for req body
    const newID = mongoose.Types.ObjectId(customerID);
    const orderDetails = {
      name: itemName,
      description: description,
      quantity: quantity,
      amountDue: amountDue,
      amountPaid: amountPaid,
      amountOutstanding: amountOutstanding,
      orderStatus: "Pending",
    };

    const update = {
      "customerID.1.orderInitiator": orderInitiator,
    $push: { "customerID.2.itemsOrdered": orderDetails},
    };
    const query = {_id:newID}; //your query here
    // const update = {}; //your update in json here
    const option = { new: true, upsert: true 
                    }; //will return updated document

    

    try {
        createOrderDB = await ORDER.findOneAndUpdate(query, update, option )
        resp.status(200).json(createOrderDB);
    } catch (err){
        resp.status(400).json({
            message:err.message})
    }
};


async function updateOrder(req, resp){
    const customerID = req.params.customerId;
    const orderID = req.params.orderId;
    const newOrderId = mongoose.Types.ObjectId(orderID);
    const NewCustomerId = mongoose.Types.ObjectId(customerID);

   
    resp.send("not implemented")
    // const list = updatedOrder.customerID[0][2].itemsOrdered;
    // let newOrderToUpdate = list.map(function (currentOrder) {
    //   if (currentOrder._id === newOrderId) {
    //     const newItem = currentElement;
    //     console.log(newItem);
    //     console.log(newItem.description);
    //     console.log(newItem.name);
    //     resp.send(newItem);
    //   }
    // });
    

   
   
};


module.exports = { orderList, createOrder, updateOrder };