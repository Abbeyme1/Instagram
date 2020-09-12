import React from "react";
import classes from "./Card.module.css";

const Card = ({
  data,
  like,
  unlike,
  user,
  comment,
  deletePost,
  deleteComment,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          alt="userPic"
        />
        <h6>{data.postedBy.name}</h6>
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
