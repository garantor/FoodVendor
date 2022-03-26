const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");

function verifyToken(headerBearer) {
    const splitToken = headerBearer.split(" ");
    console.log(splitToken[1]);
  const decoded = jwt.verify(splitToken[1], AppSecretKey);
  return decoded
}

module.exports =verifyToken;