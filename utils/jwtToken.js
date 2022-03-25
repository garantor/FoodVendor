const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, AppSecretKey, { expiresIn: "1h" });
};


module.exports={generateAccessToken}