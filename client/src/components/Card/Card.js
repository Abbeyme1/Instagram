import React from "react";
import classes from "./Card.module.css";

const Card = () => {
  return (
    <div className={classes.card}>
      <div className={classes.info}>
        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
        <h6>Username</h6>
      </div>
      <div className={classes.image}>
        <img src="https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
      </div>
      <div className={classes.cardContent}>
        <i className="material-icons" style={{ color: "red" }}>
          favorite
        </i>

        <p>500 likes</p>
        <div className={classes.description}>
          <h6 className={classes.name}>Username</h6>
          <h6>this is amazing post</h6>
        </div>
        <div className={classes.comment}>
          <input type="text" placeholder="Add a comment.." />
          <button>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
