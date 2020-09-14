const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //! FOR TOKEN
const { JWT_SECRET } = require("../keys");

router.get("/", (req, res) => {
  console.log("working");
});
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please Enter All the Fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email." });
      }

      bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
          name,
          email,
          password: hash,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => console.log(error));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.status(422).json({ error: "Invalid email or password" });
    }
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          //   res.json({ message: "successfully signed in" });
          var token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, name, email, followers, following } = user;
          res.json({ token, user: { _id, name, email, followers, following } });
        } else {
          res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((error) => console.log(error));
  });
});

module.exports = router;
