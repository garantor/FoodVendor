const express = require('express');
const router = express.Router();
const vendorController = require("../controllers/vendorControllers");


router.post("/", vendorController.createVendor);
router.post("/login", vendorController.loginVendor);
router.post("/menu", vendorController.createMenu);


module.exports=router;