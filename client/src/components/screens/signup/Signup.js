import React from "react";
import classes from "./signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.brand}>
          <span className={classes.insta}>Instagram</span>
        </div>

        <div className={classes.quote}>
          <p>Sign up to see photos and videos from your friends.</p>
        </div>
        <input className={classes.input} type="text" placeholder="Name" />
        <input className={classes.input} type="text" placeholder="email" />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
        />

        <button className={classes.btn}>Next</button>
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
