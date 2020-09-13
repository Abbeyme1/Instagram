import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./userprofile.module.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";

const UserProfile = ({ onUpdate }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  // console.log(user);

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

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        console.log("user is ", user);
        onUpdate(data.following, data.followers);

        localStorage.setItem("user", JSON.stringify(data));
        setUser((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
      });
  };

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
                    <h6>{user.user.followers.length} followers</h6>
                    <h6>{user.user.following.length} following</h6>
                  </div>
                  <div>
                    <button
                      className={classes.btn}
                      onClick={() => followUser()}
                    >
                      Follow
                    </button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (following, followers) =>
      dispatch(
        actionCreators.update({
          following: following,
          followers: followers,
        })
      ),
  };
};

export default connect(null, mapDispatchToProps)(UserProfile);
