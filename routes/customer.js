const express = require('express');
const customer = require('../controllers/customerController');
const router = express.Router();


router.post("/", customer.createCustomer) //Customer Registration
router.post("/login", customer.LoginCustomer) //Customer login


module.exports=router;