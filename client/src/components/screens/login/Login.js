import React from "react";
import classes from "./login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className={classes.card}>
        <div className={classes.brand}>
          <span className={classes.insta}>Instagram</span>
        </div>
        <input className={classes.input} type="text" placeholder="email" />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
        />

        <button className={classes.btn}>Log In</button>

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
