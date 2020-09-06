import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand brand-logo left">
          <span className={classes.logo}>Instagram</span>
        </Link>
        <ul
          id="nav-mobile"
          className="right"
          style={{ backgroundColor: "white" }}
        >
          <li>
            <Link to="/signin">
              <i class="fas fa-home" style={{ color: "black" }}></i>
            </Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
