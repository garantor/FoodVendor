// vendorController.js


const Vendor = require('../models/vendor')
const bcrypt = require('bcrypt');
const vendor = require('../models/vendor');
const jwtToken = require('../utils/jwtToken')
const rolesList = require('../config/roles');
const ROLES_OBJ = require('../config/roles');




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
        role: "Vendor",
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
           email: checkUser.email,
           id: checkUser._id,
           role: "Vendor",
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


module.exports = { createVendor, loginVendor };