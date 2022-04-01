const customerTable = require("../models/customer");
const AuthTable = require("../models/auth")
const BCRYPT = require('bcrypt')
const jwtToken = require('../utils/jwtToken')

async function createCustomer(req, resp) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const amountOutstanding = req.body.amountOutstanding;
    if(firstName && lastName && email && phoneNumber && amountOutstanding){

         // ! we are trusting the api to get us the valid outstanding bal of the user
        // We should always check this ourself in a production design
        try{

            const createdCustomer = await customerTable.create({
                                firstName,
                                lastName,
                                email,
                                phoneNumber,
                                amountOutstanding,
                                role:"Customer"
                                });
            resp.status(200).json({
            message: createdCustomer,
            });
        } catch(err){
            resp.status(400).json(err.message)
        }
    }else{
        resp.status(400).json({
            message:"firstName, lastName, email,phoneNumber,amountOutstanding are required"
        });
        }
};

async function LoginCustomer(req, resp){
    const email = req.body.email || req.params.email;
    const password = req.body.password || req.params.password;
    if (email && password){
        //
        const user = await AuthTable.findOne({email},{_id:0});
        if (user){
            //check password
            //user found
            const passwordCheck = await BCRYPT.compare(password, user.password);
            if(!passwordCheck){
                resp.status(400).json({
                message:"incorrect Password"
                });

            }else{
                const tokenData = {
                email: user.email,
                role: user.role,
                };

                const token = jwtToken.generateAccessToken(tokenData);
                resp.status(200).json({
                message: user,
                token: token,
                });
            };
        } else{
            resp.status(401).json({
                message:`user with email ${email} not recognized`
            });
        }
    } else{
        resp.status(400).json({
            message:"email and password required"
        })
    }
};





module.exports = { createCustomer, LoginCustomer };
