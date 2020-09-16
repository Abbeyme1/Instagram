import React, { useState, useEffect } from "react";
import classes from "./createPost.module.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-1" });
          } else {
            M.toast({
              html: "created post successfully",
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postData = () => {
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
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.createPost}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className={classes.file}>
        <div className={classes.btn}>
          <input
            type="file"
            className={classes.input}
            accept="image/*"
            title="&nbsp"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className={classes.submit} onClick={() => postData()}>
          submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
