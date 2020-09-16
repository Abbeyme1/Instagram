import React, { useState } from "react";
import classes from "./reset.module.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Reset = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmail("");

      M.toast({
        html: "Invalid email",
        classes: "#c62828 red darken-1",
      });
      return;
    }
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-1" });
        } else {
          M.toast({
            html: data.message,
            classes: "#43a047 green darken-1",
          });
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className={classes.card}>
        <div className={classes.brand}>
          <span className={classes.insta}>Instagram</span>
        </div>
        <input
          className={classes.input}
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className={classes.btn} onClick={() => postData()}>
          Reset Password
        </button>

        {/* <div className={classes.or}>
          <div className={classes.line}></div>
          <span>OR</span>
          <div className={classes.line}></div>
        </div>

        <Link className={classes.forgotPassword}>Forgot password?</Link> */}
      </div>
    </div>
  );
};

export default Reset;
