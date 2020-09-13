import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./profile.module.css";
import { connect } from "react-redux";

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <Navbar />
      <div className={classes.profile}>
        <div className={classes.profileInfo}>
          <div>
            <img
              className={classes.profileImage}
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              alt="profile-pic"
            />
          </div>
          <div>
            <h4>{user ? user.name : ""}</h4>
            <div className={classes.info}>
              <h6>{user ? posts.length : ""} Posts</h6>
              <h6>40 followers</h6>
              <h6>40 following</h6>
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

export default connect(mapStateToProps)(Profile);
