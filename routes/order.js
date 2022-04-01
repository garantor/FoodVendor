const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyRole = require('../middleware/verifyRoles')

router.get("/", verifyRole("Vendor"), orderController.orderList); // All Available Orders created By customers
router.post("/", orderController.createOrder); // Create Order, accessible to everyone both vendor and other customer in case of a mobile app 
router.patch("/:customerId/:orderId", verifyRole("Vendor"), orderController.updateOrder); // Update Order, only vendor 
router.post("/preOrder", orderController.PreOrder); // Update Order, only vendor 
router.delete("/:orderId", orderController.CancelOrder); // Update Order, only vendor 

module.exports = router;
