import React from "react";
import classes from "./createPost.module.css";

const CreatePost = () => {
  return (
    <div className={classes.createPost}>
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className={classes.file}>
        <div className={classes.btn}>
          {/* <span>Choose File</span> */}
          <input
            type="file"
            className={classes.input}
            accept="image/*"
            title="&nbsp"
          />
        </div>
        <div className={classes.filePath}>
          <input className="file-path" type="text" />
        </div>

        <button className={classes.submit}>submit</button>
      </div>
    </div>
  );
};

export default CreatePost;
