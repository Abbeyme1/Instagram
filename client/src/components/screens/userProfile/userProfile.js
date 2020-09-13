import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./userprofile.module.css";
import { useParams } from "react-router-dom";
import { compose } from "redux";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  return (
    <div>
      <>
        {!user ? (
          <h3>loading...</h3>
        ) : (
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
                  <h4>{user.user.name}</h4>
                  <p>{user.user.email}</p>
                  <div className={classes.info}>
                    <h6>{user.posts.length} Posts</h6>
                    <h6>40 followers</h6>
                    <h6>40 following</h6>
                  </div>
                </div>
              </div>
              <div className={classes.gallery}>
                {Object.keys(user.posts).map((post) => {
                  return (
                    <img
                      src={user.posts[post].photo}
                      alt={user.posts[post].title}
                      key={user.posts[post]._id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UserProfile;
