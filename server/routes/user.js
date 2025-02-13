const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/requireLogin");

router.get("/user/:id", requireLogin, (req, res) => {
  //   console.log("server side", req.params.id);
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          return res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  // console.log(req.body.followId);
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.user._id } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }

      User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.body.followId } },
        { new: true }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((err) => res.status(422).json({ error: err }));
    }
  );
});

router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }

      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        {
          new: true,
        }
      )
        .select("-password")
        .then((result) => res.json(result))
        .catch((err) => res.status(422).json({ error: err }));
    }
  );
});

router.put("/updatepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { profilePic: req.body.profilePic } },
    { new: true },
    (err, result) => {
      if (err) return res.status(422).json({ error: "Failed to upload pic!" });

      return res.json(result);
    }
  );
});

router.post("/search-user", (req, res) => {
  const user = new RegExp("^" + req.body.query);
  User.find({ name: { $regex: user } })
    .select("_id name profilePic")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/editDetails", requireLogin, (req, res) => {
  console.log(req.body.bio);
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, bio: req.body.bio } },
    { new: true }
  )
    .then((user) => {
      console.log(user);
      res.json({ user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
