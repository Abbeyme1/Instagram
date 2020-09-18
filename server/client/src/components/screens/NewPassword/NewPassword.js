import React, { useState } from "react";
import classes from "./NewPassword.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import * as actionCreators from "../../../store/actions/index";

const NewPassword = ({ getUser }) => {
  const history = useHistory();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  console.log(token);

  const postData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          type="password"
          placeholder="Enter new Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={classes.btn} onClick={() => postData()}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
