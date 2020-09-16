const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); //! FOR TOKEN
const { JWT_SECRET } = require("../config/keys");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { API_KEY } = require("../config/keys");
const crypto = require("crypto");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: API_KEY,
    },
  })
);

router.get("/", (req, res) => {
  console.log("working");
});
router.post("/signup", (req, res) => {
  const { name, email, password, profilePic } = req.body;
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
          profilePic,
        });

        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "abhy1209120@gmail.com",
              subject: "Signup Success!",
              html: "<h1>Welcome to instagraamm!</h1>",
            });
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
          const { _id, name, email, followers, following, profilePic } = user;
          res.json({
            token,
            user: { _id, name, email, followers, following, profilePic },
          });
        } else {
          res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((error) => console.log(error));
  });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user)
        return res.status(422).json("User doesn't exists with this email");

      (user.resetToken = token), (user.expireToken = Date.now() + 3600000);
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "abhy1209120@gmail.com",
          subject: "Reset Password",
          html: `<p>YOU REQUESTED FOR PASSWORD RESET</p>
          <h5>click <a href="http://localhost:3000/reset/${token}">here</a> to reset password</h5>
          `,
        });
        res.json({ message: "Check your email" });
      });
    });
  });
});
module.exports = router;
