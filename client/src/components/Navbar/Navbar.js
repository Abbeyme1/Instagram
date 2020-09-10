import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { connect } from 'react-redux';
import * as actionCreators from "../../store/actions/index"


const Navbar = ({ user }) => {
  const renderList = (user) => {
    console.log("user is", user);
    if (user) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Create Post</Link>
        </li>
      ]
    }
    else {
      return [
        <li>
          <Link to="/signin">
            <i className="fas fa-home" style={{ color: "black" }}></i>
          </Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      ]
    }
  }

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
          {renderList(user)}

        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(Navbar);
