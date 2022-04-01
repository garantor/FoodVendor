const ORDER = require("../models/order");
const MENU = require("../models/menu");

const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");
const verifyToken = require("../utils/verifyJwt");
const mongoose = require("mongoose");
const CUSTOMERS = require("../models/customer");
const menu = require("../models/menu");

async function orderList(req, resp) {
  try {
    const orderList = await ORDER.find();
    if (orderList.length === 0) {
      resp.status(200).json({
        message: "Order List is Empty",
      });
    } else {
      resp.status(200).json(orderList);
    }
  } catch (err) {
    resp.status(400).json(err);
  }
}
// need to add date and time
async function createOrder(req, resp) {
  // We should get UserId from the header through JWt not trusting our API to send the correct id
  // amountDue and amount Outstanding should be construct server side not trusting API
  // get customersID from token header, use that to fetch user detail to get outstanding balance
  const userToken =
    req.headers["Authorization"] ||
    req.headers["authorization"] ||
    req.headers["x-access-token"];

  const menuID = req.body.menuId;
  const quantity = req.body.quantity;
  if (menuID && quantity) {
    try {
      const userId = verifyToken(userToken);
      let email = userId.email;
      const customers = await CUSTOMERS.find({ email });
      const customerId = customers[0]._id.toString();
      const Menu = await MENU.findById(menuID);
      if (Menu) {
        try {
          const orderInitiator = customerId; // this is the vendor, it should br fetch from the jwt
          console.log(orderInitiator);

          const newID = mongoose.Types.ObjectId(customerId);

          const query = { _id: newID };

          const orderDetails = {
            name: Menu.name,
            description: Menu.description,
            quantity: quantity,
            amountDue: Menu.price,
            amountPaid: 0,
            amountOutstanding: Menu.price,
            orderStatus: "Pending",
          };

          const update = {
            "customerID.1.orderInitiator": orderInitiator,
            $push: { "customerID.2.itemsOrdered": orderDetails },
          };

          const option = { new: true, upsert: true }; //will return updated document

          const createOrderDB = await ORDER.findOneAndUpdate(
            query,
            update,
            option
          );
          console.log(createOrderDB);
          resp.status(200).json(createOrderDB);
        } catch (err) {
          resp.status(400).json({ message: err });
        }
      } else {
        resp.status(400).json({
          message: "invalid menuId",
        });
      }
    } catch (err) {
      resp.status(400).json({ message: err });
    }
  } else {
    resp.status(400).json({
      message: "menuId and quantity are required",
    });
  }
}

async function PreOrder(req, resp) {
  const userToken =
    req.headers["Authorization"] ||
    req.headers["authorization"] ||
    req.headers["x-access-token"];
  if (userToken) {
    try {
      const userId = verifyToken(userToken);
      console.log(userId);

      const description = req.body.description;
      const amountDue = req.body.amountDue;
      const itemName = req.body.itemName;

      console.log(!itemName || !description || !amountDue);
      if (!itemName || !description || !amountDue) {
        resp.status(400).json({
          message: "itemName, description, amountDue and quantity are required",
        });
      } else {
        try {
          const userDetails = await CUSTOMERS.find({
            email: userId.email,
          });
          console.log(userDetails);
          console.log(userDetails[0]._id);
          console.log(userDetails[0]._id.toString());
          const amountPaid = 0;
          const customerID = userDetails[0]._id;
          const orderInitiator = userDetails[0]._id.toString(); // this i
          const amountOutstanding = amountDue;
          const quantity = 0;
          console.log(itemName, amountDue, description, quantity);

          //   const newID = userDetails[0]._id;
          const orderDetails = {
            name: itemName,
            description: description,
            quantity: quantity,
            amountDue: amountDue,
            amountPaid: amountPaid,
            amountOutstanding: amountOutstanding,
            orderStatus: "Pending",
            preOrder: true,
          };

          const update = {
            "customerID.1.orderInitiator": orderInitiator,
            $push: { "customerID.2.itemsOrdered": orderDetails },
          };
          const query = { _id: customerID }; //your query here
          // const update = {}; //your update in json here
          const option = { new: true, upsert: true }; //will return updated document
          const createOrderDB = await ORDER.findOneAndUpdate(
            query,
            update,
            option
          );

          resp.send(createOrderDB);
        } catch (err) {
          resp.status(400).json({ message: err });
        }
      }
    } catch (err) {
      resp.status(400).json({
        message: err,
      });
    }
  } else {
    resp.status(401).json({
      message: "Authorization Required",
    });
  }
}

async function updateOrder(req, resp) {
  const customerID = req.params.customerId;
  const orderID = req.params.orderId;
  const newOrderId = mongoose.Types.ObjectId(orderID);
  const NewCustomerId = mongoose.Types.ObjectId(customerID);

  resp.send("not implemented");
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

async function CancelOrder(req, resp) {
    const userToken =
        req.headers["Authorization"] ||
        req.headers["authorization"] ||
        req.headers["x-access-token"];

    if (userToken){
        try{
            const orderID = req.params.orderId;
            console.log(orderID);
            const verifyJwt = verifyToken(userToken);
            console.log(verifyJwt);
            console.log(verifyJwt.email);
            const customerDetails = await CUSTOMERS.find({email:verifyJwt.email});
            console.log("************************")
            console.log(customerDetails);
            const _id = customerDetails[0]._id;
            console.log(_id)
            try{
            const deleteOrder = await ORDER.findOneAndUpdate(
              {
                _id,
              },
              {
                $pull: {
                  itemsOrdered: orderID,
                },
              }
            );
                console.log(deleteOrder);

                resp.send(deleteOrder);

            } catch(err){
                resp.status(400).json({
                    message: err,
                });
            }
            


        } catch (err){
            resp.status(400).json({
                message:err
            })
        }

    } else{
        resp.status(400).json({
            message:"Authorization Required"
        })
    }
}

module.exports = { orderList, createOrder, updateOrder, CancelOrder, PreOrder };
