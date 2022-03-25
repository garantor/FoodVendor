const AppSecretKey = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");

function generateAccessToken(data) {
  return jwt.sign(data, AppSecretKey, { expiresIn: "1h" });
};

function decodeAccessToken(data){
  
  try {
    const tokenSplit = data.split(' ')
    const decoded = jwt.verify(tokenSplit[1], AppSecretKey);
    if (decoded.role === Roles) {
      next();
    } else {
      return resp.sendStatus(401);
    }

    console.log(decoded);
  } catch (err) {
    resp.status(401).send("Invalid Token");
  }
}

module.exports={generateAccessToken}