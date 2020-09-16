import React, { useState } from "react";
import classes from "./signup.module.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
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
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
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

        <div className={classes.quote}>
          <p>Sign up to see photos and videos from your friends.</p>
        </div>
        <input
          className={classes.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Next
        </button>
        <div className={classes.terms}>
          <p>
            By signing up, you agree to our Terms . Learn how we collect, use
            and share your data in our Data Policy and how we use cookies and
            similar technology in our Cookies Policy .
          </p>
        </div>
      </div>
      <div className={classes.card2}>
        <p>
          Have an account?
          <Link to="/signin">
            <span className={classes.signup}> Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
