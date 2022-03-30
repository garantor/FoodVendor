

const AUTHMODEL = require('../models/auth')
const BCRYPT = require('bcrypt')



async function createUserAuthentication(request, response){
    const email = request.body.email || request.params.email;
    const password = request.body.password || request.params.password;
    if (email && password){
        const hashPassword = await BCRYPT.hash(password, 10);

        //we should check db to make sure user email exist before adding to authentication doc
        // every user get a customer role until reset by the admin
        try{
            const addedUser = await AUTHMODEL.create({
                email,
                password: hashPassword,
                role: "Customer",
            });
            response.status(200).json({
                message: addedUser,
            });

        } catch(err){
            response.status(401).json({
                message:err.message
            })
        }
        
    } else{
        response.status(400).json({
            message:"email and password required"
        });
    }

};


module.exports = { createUserAuthentication}