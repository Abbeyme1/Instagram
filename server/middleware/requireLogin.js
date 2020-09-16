const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payLoad) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    const { _id } = payLoad;
    User.findById(_id).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
