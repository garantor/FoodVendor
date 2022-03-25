const jwt = require('jsonwebtoken')
const appSecret = process.env.APP_SECRET

// get user role from jwt

function verifyRole(Roles){
    return function (req, resp, next){
        const token =
          req.headers["authorization"] ||
          req.headers["Authorization"] ||
          req.headers["x-access-token"];

        if(!token) return resp.sendStatus(401);
        console.log(token)
        const tokenSplit = token.split(" ");
        try{
            const decoded = jwt.verify(tokenSplit[1], appSecret);
            if (decoded.role === Roles) {
              next();
            } else {
              return resp.sendStatus(401);
            }

            console.log(decoded);

        } catch(err){
            resp.status(401).send("Invalid Token")
        }
    }

}

module.exports=verifyRole;