const bcrypt = require("bcrypt");
const MENU = require("../models/menu");
const jwtToken = require("../utils/jwtToken");


async function createMenu(req, resp){
    // resp.send("Ok")
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    // we need to get the vendor id from jwt and add to menu
    const id = Math.floor(100000000000 + Math.random() * 900000000000);
    console.log(id)
    if (name && description && price && quantity) {
      const menuCreated = await MENU.create({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        vendorID: id,
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