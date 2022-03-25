// vendorController.js


const Vendor = require('../models/vendor')
const bcrypt = require('bcrypt');
const vendor = require('../models/vendor');
const jwtToken = require('../utils/jwtToken')




async function createVendor(req, res) {
  const bizName = req.body.businessName;
  const PhoneNumber = req.body.PhoneNumber;
  const email = req.body.email;
  const password= req.body.password;

  if ((bizName && PhoneNumber && email && password)) {
    const hashPassword = await bcrypt.hash(password, 10);
    try {
      const createdVendor = await Vendor.create({
        businessName: bizName,
        email: email,
        PhoneNumber: PhoneNumber,
        password: hashPassword,
      });
      res.send(createdVendor);
    } catch (err) {
      res.status(409).json({
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      message:
        "businessName, PhoneNumber, password and email are required parameters",
    });
  };
};

async function loginVendor(req, resp){
  const email = req.body.email;
  const password = req.body.password;
  if(email && password){
    let checkUser = await vendor.findOne({email});
    if(checkUser){
      //user found
      passwordCheck = await bcrypt.compare(password, checkUser.password);
      if(!passwordCheck){
        resp.status(400).json({
          message:"incorrect Password"
        });
      }else{
         const tokenData = {
           email: passwordCheck.email,
           id: passwordCheck._id,
         };

         const token = jwtToken.generateAccessToken(tokenData);
         resp.status(200).json({
           message: checkUser,
           token: token,
         });
      };

    }else{
      resp.status(401).json({
        message:`Vendor with email ${email} not found`
      })
    }

  } else{
    resp.status(401).json({
      message:"email and password required"
    });
  };
};


async function createMenu(req, resp){
  console.log("ok")

};

module.exports = { createVendor, loginVendor, createMenu };