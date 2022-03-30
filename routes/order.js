const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.orderList); // All Available Orders created By customers
router.post("/", orderController.createOrder); // Create Order 
router.patch("/:customerId/:orderId", orderController.updateOrder); // Update Order, only vendor 

module.exports = router;
