const express = require('express')
const router = express.Router()
const menu = require('../controllers/MenuController');


router.post('/', menu.createMenu);
router.patch("/", menu.updateMenu);

module.exports = router