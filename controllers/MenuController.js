const MENU = require("../models/menu");
const AppSecretKey = process.env.APP_SECRET
const jwt = require('jsonwebtoken')
const verifyToken = require('../utils/verifyJwt')


async function createMenu(req, resp){
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const token =
        req.headers["Authorization"] ||
        req.headers["authorization"] ||
        req.headers["x-access-token"];
    // we need to get the vendor id from jwt and add to menu
    
    const decoded = verifyToken(token);
    const vendorId = decoded.id
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

async function updateMenu(req, resp){
    // resp.send("ok");
    const menuID = req.body.id
    const name = req.body.name
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    if (menuID){
            const token =
            req.headers["Authorization"] ||
            req.headers["authorization"] ||
            req.headers["x-access-token"];
        const vendorID = verifyToken(token);
        const Menu = await MENU.findById(menuID);
        const menuVendorId = Menu.vendorID.toString();
        const reqVendorId = vendorID.id;
        // only a vendor that created an order can update
        if (menuVendorId === reqVendorId){
            const updateMenu =(
            Menu.name = name,
            Menu.description = description,
            Menu.quantity = quantity,
            Menu.price = price)
            await Menu.save()
            resp.status(200).json({ message: Menu });

        }else{
            resp.sendStatus(401)
        }
    } else{
        resp.status(400).json({ message: "id required" });
    }
};


async function menuList(request, response){
    try{
        const allMenu = await MENU.find().select("_id name description price quantity ")
        response.status(200).json({
          message: allMenu,
        });

    }catch (err){
        response.status(400).json({
          message: err.message,
        });
    }

};





module.exports = { createMenu, updateMenu, menuList };