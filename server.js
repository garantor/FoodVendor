require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
// const router = express.Router()
const dbConnection = require("./config/db_connection.js");
const mongoose = require('mongoose')
const vendor = require('./routes/vendor')
const menu = require('./routes/menu')
dbConnection()

//set cors
app.use(cors());
//setting options
app.options("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.use(express.json()); //use for json request
app.use(express.urlencoded({extended:false})); //use for Form request

app.use( (req, res, next)=>{
    console.log(`${req.method} - ${req.path} - ${req.ip}`);
    next();
});


app.use("/vendor", vendor);
app.use("/menu", menu);


mongoose.connection.once("open", () => {
  console.log("Database connection successful");
  app.listen(PORT, () => console.log(`listening on port  ${PORT}`));
});