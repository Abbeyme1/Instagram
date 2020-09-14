import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import classes from "./userprofile.module.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { useHistory } from "react-router-dom";

const UserProfile = ({ onUpdate, mainUser }) => {
  const history = useHistory();
  const { userId } = useParams();
  const [follow, setShowFollow] = useState(
    mainUser && (mainUser.following.includes(userId) ? false : true)
  );
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
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onUpdate(data.following, data.followers);

        localStorage.setItem("user", JSON.stringify(data));
        setUser((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
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
                <div className={classes.imageBox}>
                  <img
                    className={classes.profileImage}
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    alt="profile-pic"
                  />
                </div>
                <div className={classes.infoBox}>
                  <h4>{user.user.name}</h4>
                  <p>{user.user.email}</p>
                  <div className={classes.info}>
                    <h6>{user.posts.length} Posts</h6>
                    <h6>{user.user.followers.length} followers</h6>
                    <h6>{user.user.following.length} following</h6>
                  </div>
                  <div>
                    {mainUser && mainUser._id == userId ? (
                      history.push("/profile")
                    ) : (
                      <>
                        {follow ? (
                          <button
                            className={classes.btnFollow}
                            onClick={() => followUser()}
                          >
                            Follow
                          </button>
                        ) : (
                          <button
                            className={classes.btnUnfollow}
                            onClick={() => unfollowUser()}
                          >
                            Following
                          </button>
                        )}
                      </>
                    )}
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

const mapStateToProps = (state) => {
  return {
    mainUser: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
