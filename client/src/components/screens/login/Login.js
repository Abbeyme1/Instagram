import React, { useState } from "react";
import classes from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setEmail("");
      setPassword("");
      M.toast({
        html: "Invalid email",
        classes: "#c62828 red darken-1",
      });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-1" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({
            html: "signedIn success!",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
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
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={classes.btn} onClick={() => postData()}>
          Log In
        </button>

        <div className={classes.or}>
          <div className={classes.line}></div>
          <span>OR</span>
          <div className={classes.line}></div>
        </div>

        <Link className={classes.forgotPassword}>Forgot password?</Link>
      </div>
      <div className={classes.card2}>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className={classes.signup}>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
