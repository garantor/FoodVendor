const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");

function verifyToken(headerBearer) {
  try{
      const splitToken = headerBearer.split(" ");
      const decoded = jwt.verify(splitToken[1], AppSecretKey);
      return decoded;

  } catch(err){
    return "Header Required"
  }
  
}

module.exports =verifyToken;