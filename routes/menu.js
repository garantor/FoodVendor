const express = require('express')
const router = express.Router()
const menu = require('../controllers/MenuController');


router.post('/', menu.createMenu);

module.exports = router