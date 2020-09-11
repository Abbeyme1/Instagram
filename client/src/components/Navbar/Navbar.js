import React from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Navbar.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import M from "materialize-css";

const Navbar = ({ user, onLogout }) => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    onLogout();
    M.toast({
      html: "Logged Out!",
      classes: "#c62828 red darken-1",
    });
    return history.push("/signin");
  };
  const renderList = (user) => {
    if (user) {
      return [
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="create">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="logout">
          <Link to="#" onClick={logout} className={classes.logout}>
            Logout
          </Link>
        </li>,
      ];
    } else {
      return [
        <li key="sigin">
          <Link to="/signin">
            <i className="fas fa-home" style={{ color: "black" }}></i>
          </Link>
        </li>,
        <li key="signup">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

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
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
