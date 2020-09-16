import React from "react";
import classes from "./Card.module.css";
import { Link, NavLink } from "react-router-dom";

const Card = ({
  data,
  like,
  unlike,
  user,
  comment,
  deletePost,
  deleteComment,
  profilePic,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img src={profilePic && profilePic} alt="userPic" />
        <Link
          to={
            user !== data.postedBy._id
              ? `/profile/${data.postedBy._id}`
              : "/profile"
          }
        >
          {data.postedBy.name}
        </Link>
        {user === data.postedBy._id && (
          <div className={classes.delete} onClick={() => deletePost(data._id)}>
            <i className="material-icons" style={{ float: "right" }}>
              delete
            </i>
          </div>
        )}
      </div>
      <div className={classes.image}>
        <img src={data.photo} alt="post" />
      </div>
      <div className={classes.cardContent}>
        {data.likes.includes(user) ? (
          <i
            className="material-icons"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              unlike(data._id);
            }}
          >
            favorite
          </i>
        ) : (
          <i
            className="material-icons"
            style={{ color: "#e5e5e5", cursor: "pointer" }}
            onClick={() => {
              like(data._id);
            }}
          >
            favorite
          </i>
        )}

        <p>{data.likes.length} likes</p>
        <div className={classes.description}>
          <h6 className={classes.name}>Username</h6>
          <h6>{data.title}</h6>
          <p>{data.body}</p>
        </div>
        <div className={classes.commentList}>
          {data.comments.map((comment) => {
            return (
              <p>
                <span style={{ fontWeight: "bold" }}>
                  {comment.postedBy.name}
                </span>{" "}
                {comment.text}
                {user === comment.postedBy._id && (
                  <i
                    style={{
                      fontSize: "15px",
                      marginLeft: "340px",
                      cursor: "pointer",
                    }}
                    className="material-icons"
                    onClick={() => deleteComment(data._id, comment._id)}
                  >
                    delete
                  </i>
                )}
              </p>
            );
          })}
        </div>
        <div className={classes.comment}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              comment(e.target[0].value, data._id);
              e.target[0].value = null;
            }}
          >
            <input type="text" placeholder="Add a comment.." />
            <button>Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
