const bcrypt = require("bcrypt");
const MENU = require("../models/menu");
const AppSecretKey = process.env.APP_SECRET
const jwt = require('jsonwebtoken')

async function createMenu(req, resp){
    // resp.send("Ok")
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const token =
      req.headers["Authorization"] ||
      req.headers["authorization"] ||
      req.headers["x-access-token"];
    // we need to get the vendor id from jwt and add to menu
    const splitToken = token.split(" ")
    console.log(splitToken[1])
     const decoded = jwt.verify(splitToken[1], AppSecretKey);
   

    console.log(decoded);

    const vendorId = decoded.id
    console.log(vendorId)
    if (name && description && price && quantity) {
      const menuCreated = await MENU.create({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        vendorID: vendorId,
      });
      resp.status(200).json({
          message:menuCreated
      })
    } else {
      resp.status(400).json({
        message: "name, description, price and quantity are required",
      });
    }
};


module.exports={createMenu}