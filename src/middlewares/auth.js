const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("No Token Found!!!");
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decodedData;
    const user = await User.findById(id);
    if (!user) throw new Error("No User Found!!!");

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { userAuth };
