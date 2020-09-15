import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./profile.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

const Profile = ({ user, onUploadPic }) => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "abbeyme");
      fetch("https://api.cloudinary.com/v1_1/abbeyme/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              profilePic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...user, profilePic: result.profilePic })
              );
              onUploadPic(result.profilePic);
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
      });
  }, []);

  const uploadProfilePic = (image) => {
    setImage(image);
  };

  const chooseImage = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      var file = e.target.files[0];
      uploadProfilePic(file);
    };

    input.click();
  };

  return (
    <div>
      <Navbar />
      <div className={classes.profile}>
        <div className={classes.profileInfo}>
          <div>
            <img
              className={classes.profileImage}
              src={user && user.profilePic}
              alt="profile-pic"
              onClick={chooseImage}
            />
          </div>
          <div>
            <h4>{user ? user.name : ""}</h4>
            <p>{user ? user.email : ""}</p>
            <div className={classes.info}>
              <h6>{user ? posts.length : ""} Posts</h6>
              <h6>{user ? user.followers.length : ""} followers</h6>
              <h6>{user ? user.following.length : ""} following</h6>
            </div>
            <div>
              <button className={classes.editProfile}>Edit profile</button>
            </div>
          </div>
        </div>
        <div className={classes.gallery}>
          {Object.keys(posts).map((post) => {
            return (
              <img
                src={posts[post].photo}
                alt={posts[post].title}
                key={posts[post]._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadPic: (profilePic) =>
      dispatch(actionCreators.uploadPic({ profilePic: profilePic })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
