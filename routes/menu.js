const express = require('express')
const router = express.Router()
const menu = require('../controllers/MenuController');
const verifyRole = require("../middleware/verifyRoles");


router.post('/', verifyRole("Vendor"), menu.createMenu); // Creating Menu for Vendors alone
router.patch("/", verifyRole("Vendor"), menu.updateMenu); // Updating menu, Vendors Only
router.get("/", menu.menuList); // get list of all menu, available to both vendors and Customers

module.exports = router